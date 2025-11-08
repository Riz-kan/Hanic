(function () {
  'use strict';

  var TRIGGER_SELECTOR = '[data-quick-view-trigger]';

  function onReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  }

  function formatMoney(cents) {
    if (typeof Shopify !== 'undefined' && Shopify && typeof Shopify.formatMoney === 'function') {
      return Shopify.formatMoney(cents);
    }

    var amount = (Number(cents) || 0) / 100;
    var currency = 'USD';
    if (typeof Shopify !== 'undefined' && Shopify && Shopify.currency && Shopify.currency.active) {
      currency = Shopify.currency.active;
    }
    return amount.toLocaleString(undefined, {
      style: 'currency',
      currency: currency
    });
  }

  function resolveUrl(trigger) {
    if (!trigger) return null;

    var directUrl = trigger.getAttribute('data-quick-view-url');
    if (directUrl) return directUrl;

    var handle = trigger.getAttribute('data-quick-view-handle');
    if (!handle) return null;

    var explicitProductUrl = trigger.getAttribute('data-quick-view-product-url');
    var root = (window.Shopify && Shopify.routes && Shopify.routes.root) || '/';
    var baseUrl = explicitProductUrl || (root.replace(/\/$/, '') + '/products/' + handle);
    var separator = baseUrl.indexOf('?') === -1 ? '?' : '&';
    return baseUrl + separator + 'section_id=universal-quick-view-content';
  }

  function getFocusableElements(container) {
    if (!container) return [];
    var focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([type="hidden"]):not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ];
    return Array.prototype.slice.call(
      container.querySelectorAll(focusableSelectors.join(','))
    ).filter(function (el) {
      return el.offsetParent !== null || el === document.activeElement;
    });
  }

  function chooseImageUrl(src, size) {
    if (!src) return '';
    if (
      typeof Shopify !== 'undefined' &&
      Shopify &&
      Shopify.Image &&
      typeof Shopify.Image.getSizedImageUrl === 'function'
    ) {
      return Shopify.Image.getSizedImageUrl(src, size);
    }

    var parts = src.split('?');
    var url = parts[0];
    var query = parts[1] ? '?' + parts[1] : '';
    var dotIndex = url.lastIndexOf('.');
    if (dotIndex === -1) return src;
    return url.slice(0, dotIndex) + '_' + size + url.slice(dotIndex) + query;
  }

  function buildSrcSet(src) {
    if (!src) return '';
    var sizes = [
      { width: 480, size: '480x' },
      { width: 720, size: '720x' },
      { width: 960, size: '960x' }
    ];
    return sizes
      .map(function (entry) {
        return chooseImageUrl(src, entry.size) + ' ' + entry.width + 'w';
      })
      .join(', ');
  }

  onReady(function () {
    var modal = document.querySelector('[data-universal-quick-view]');
    if (!modal) return;

    var dialog = modal.querySelector('[data-quick-view-dialog]');
    var contentTarget = modal.querySelector('[data-quick-view-body]');
    var loader = modal.querySelector('[data-quick-view-loader]');
    var feedback = modal.querySelector('[data-quick-view-status]');
    var backdrop = modal.querySelector('[data-quick-view-backdrop]');

    var closeButtons = modal.querySelectorAll('[data-quick-view-close]');

    var isOpen = false;
    var activeTrigger = null;
    var lastFocused = null;
    var currentProduct = null;
    var currentSection = null;

    function setLoading(state) {
      if (!loader) return;
      loader.hidden = !state;
      if (state) {
        loader.setAttribute('aria-busy', 'true');
      } else {
        loader.removeAttribute('aria-busy');
      }
    }

    function setFeedback(message, isError) {
      if (!feedback) return;
      if (!message) {
        feedback.hidden = true;
        feedback.textContent = '';
        feedback.removeAttribute('data-status-type');
        return;
      }
      feedback.hidden = false;
      feedback.textContent = message;
      if (isError) {
        feedback.setAttribute('data-status-type', 'error');
      } else {
        feedback.removeAttribute('data-status-type');
      }
    }

    function getCurrentForm() {
      if (!currentSection) return null;
      return currentSection.querySelector('[data-quick-view-form]');
    }

    function setFormStatus(form, message, type) {
      if (!form) return;
      var statusEl = form.querySelector('[data-quick-view-form-status]');
      if (!statusEl) return;
      statusEl.textContent = message || '';
      if (!type) {
        statusEl.removeAttribute('data-status-type');
        return;
      }
      statusEl.setAttribute('data-status-type', type);
    }

    function markActiveThumbnail(mediaId) {
      if (!currentSection) return;
      var buttons = currentSection.querySelectorAll('[data-quick-view-thumb]');
      buttons.forEach(function (button) {
        if (mediaId && button.getAttribute('data-media-id') === String(mediaId)) {
          button.setAttribute('data-selected', 'true');
        } else {
          button.removeAttribute('data-selected');
        }
      });
    }

    function primaryMediaId(section) {
      if (!section) return null;
      var img = section.querySelector('[data-quick-view-primary-image]');
      if (!img) return null;
      return img.getAttribute('data-media-id');
    }

    function updatePrimaryImage(variant) {
      if (!currentSection) return;
      var mainImage = currentSection.querySelector('[data-quick-view-primary-image]');
      var placeholder = currentSection.querySelector('[data-quick-view-primary-placeholder]');

      var media = null;
      if (variant && variant.featured_media) {
        media = variant.featured_media;
      } else if (currentProduct && currentProduct.featured_media) {
        media = currentProduct.featured_media;
      }

      if (!mainImage && placeholder && media && media.preview_image) {
        mainImage = document.createElement('img');
        mainImage.className = 'uqv-media__image';
        mainImage.setAttribute('loading', 'lazy');
        mainImage.setAttribute('data-quick-view-primary-image', '');
        placeholder.replaceWith(mainImage);
      }

      if (!mainImage) {
        markActiveThumbnail(media && media.id ? media.id : primaryMediaId(currentSection));
        return;
      }

      if (media && media.preview_image) {
        var preview = media.preview_image;
        if (preview.src) {
          mainImage.src = chooseImageUrl(preview.src, '960x');
          mainImage.srcset = buildSrcSet(preview.src);
        }
        mainImage.setAttribute('data-media-id', media.id || '');
        if (preview.alt) {
          mainImage.alt = preview.alt;
        }
        markActiveThumbnail(media.id);
        return;
      }

      if (media && media.src) {
        mainImage.src = chooseImageUrl(media.src, '960x');
        mainImage.srcset = buildSrcSet(media.src);
        mainImage.setAttribute('data-media-id', media.id || '');
        if (media.alt) {
          mainImage.alt = media.alt;
        }
        markActiveThumbnail(media.id);
        return;
      }

      markActiveThumbnail(primaryMediaId(currentSection));
    }

    function buildPriceHTML(variant) {
      if (!variant) return '';
      var current = formatMoney(variant.price);
      if (variant.compare_at_price && variant.compare_at_price > variant.price) {
        return (
          '<span class="uqv-price__current">' +
          current +
          '</span>' +
          '<span class="uqv-price__compare">' +
          formatMoney(variant.compare_at_price) +
          '</span>'
        );
      }
      return '<span class="uqv-price__current">' + current + '</span>';
    }

    function findVariantById(id) {
      if (!currentProduct || !Array.isArray(currentProduct.variants)) return null;
      var targetId = Number(id);
      return (
        currentProduct.variants.find(function (variant) {
          return Number(variant.id) === targetId;
        }) || null
      );
    }

    function findVariantByOptions(options) {
      if (!currentProduct || !Array.isArray(currentProduct.variants)) return null;
      return (
        currentProduct.variants.find(function (variant) {
          return options.every(function (value, index) {
            if (!value) return true;
            return variant.options && variant.options[index] === value;
          });
        }) || null
      );
    }

    function updateVariantUI(variant) {
      if (!currentSection) return;
      var priceEl = currentSection.querySelector('[data-quick-view-price]');
      if (priceEl) {
        priceEl.innerHTML = buildPriceHTML(variant);
      }

      var availability = currentSection.querySelector('[data-quick-view-availability]');
      if (availability) {
        var availableText = availability.getAttribute('data-availability-available') || '';
        var unavailableText = availability.getAttribute('data-availability-unavailable') || '';
        if (variant && variant.available) {
          availability.textContent = availableText;
          availability.classList.remove('uqv-content__availability--soldout');
        } else {
          availability.textContent = unavailableText;
          availability.classList.add('uqv-content__availability--soldout');
        }
      }

      var form = getCurrentForm();
      if (form) {
        var idInput = form.querySelector('[data-quick-view-variant-id]');
        if (idInput) {
          idInput.value = variant ? variant.id : '';
        }
        var addButton = form.querySelector('[data-quick-view-add]');
        if (addButton) {
          addButton.disabled = !(variant && variant.available);
        }
      }

      updatePrimaryImage(variant);
    }

    function handleOptionChange(event) {
      if (!event.target.matches('[data-quick-view-option]')) return;
      var form = event.currentTarget;
      var groups = form.querySelectorAll('[data-quick-view-option-group]');
      var selections = [];
      groups.forEach(function (group, index) {
        var chosen = group.querySelector('[data-quick-view-option]:checked');
        selections[index] = chosen ? chosen.value : null;
      });
      var variant = findVariantByOptions(selections);
      if (!variant) {
        updateVariantUI(null);
        setFormStatus(form, form.getAttribute('data-quick-view-unavailable') || '', 'error');
        return;
      }
      setFormStatus(form, '', null);
      updateVariantUI(variant);
    }

    function handleThumbClick(event) {
      var button = event.currentTarget;
      var src = button.getAttribute('data-media-src');
      if (!src || !currentSection) return;
      event.preventDefault();
      var mainImage = currentSection.querySelector('[data-quick-view-primary-image]');
      if (mainImage) {
        mainImage.src = src;
        var srcset = button.getAttribute('data-media-srcset');
        if (srcset) {
          mainImage.srcset = srcset;
        }
        var alt = button.getAttribute('data-media-alt');
        if (alt) {
          mainImage.alt = alt;
        }
        mainImage.setAttribute('data-media-id', button.getAttribute('data-media-id') || '');
      }
      markActiveThumbnail(button.getAttribute('data-media-id'));
    }

    function handleFormSubmit(event) {
      event.preventDefault();
      var form = event.currentTarget;
      var variantInput = form.querySelector('[data-quick-view-variant-id]');
      if (!variantInput || !variantInput.value) {
        setFormStatus(form, form.getAttribute('data-quick-view-unavailable') || '', 'error');
        return;
      }

      var addButton = form.querySelector('[data-quick-view-add]');
      if (addButton) {
        addButton.disabled = true;
      }
      setFormStatus(form, '', null);

      var formData = new FormData(form);
      var root = (window.Shopify && Shopify.routes && Shopify.routes.root) || '/';
      var requestUrl = root.replace(/\/$/, '') + '/cart/add.js';

      fetch(requestUrl, {
        method: 'POST',
        body: formData,
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json'
        }
      })
        .then(function (response) {
          return response.text().then(function (text) {
            var payload = {};
            try {
              payload = text ? JSON.parse(text) : {};
            } catch (error) {
              payload = { description: text };
            }
            if (!response.ok) {
              var errorMessage = (payload && payload.description) || form.getAttribute('data-quick-view-error') || 'Unable to add to cart.';
              throw new Error(errorMessage);
            }
            return payload;
          });
        })
        .then(function (payload) {
          if (addButton) {
            addButton.disabled = false;
          }
          var successMessage = form.getAttribute('data-quick-view-success') || '';
          setFormStatus(form, successMessage, successMessage ? 'success' : null);

          var detail = { detail: { product: payload } };
          window.dispatchEvent(new CustomEvent('cart:refresh', detail));
          document.dispatchEvent(new CustomEvent('quick-view:product-added', detail));
        })
        .catch(function (error) {
          if (addButton) {
            addButton.disabled = false;
          }
          setFormStatus(form, error.message || form.getAttribute('data-quick-view-error') || 'Error', 'error');
        });
    }

    function focusFirstElement() {
      var focusables = getFocusableElements(dialog);
      if (focusables.length) {
        focusables[0].focus();
      } else if (dialog) {
        dialog.focus();
      }
    }

    function enhanceSection(section) {
      if (!section) return;
      var heading = section.querySelector('[data-quick-view-heading]');
      if (heading) {
        if (!heading.id) {
          heading.id = 'uqv-title-' + Date.now();
        }
        dialog.setAttribute('aria-labelledby', heading.id);
      } else {
        dialog.removeAttribute('aria-labelledby');
      }

      var description = section.querySelector('[data-quick-view-description]');
      if (description) {
        if (!description.id) {
          description.id = 'uqv-desc-' + Date.now();
        }
        dialog.setAttribute('aria-describedby', description.id);
      } else {
        dialog.removeAttribute('aria-describedby');
      }

      section.querySelectorAll('[data-quick-view-thumb]').forEach(function (button) {
        button.addEventListener('click', handleThumbClick);
      });

      var form = section.querySelector('[data-quick-view-form]');
      if (form) {
        form.addEventListener('change', handleOptionChange);
        form.addEventListener('submit', handleFormSubmit);
      }

      var initialVariantId = null;
      if (form) {
        var idInput = form.querySelector('[data-quick-view-variant-id]');
        if (idInput && idInput.value) {
          initialVariantId = idInput.value;
        }
      }
      var initialVariant = findVariantById(initialVariantId);
      if (!initialVariant && currentProduct && Array.isArray(currentProduct.variants)) {
        initialVariant = currentProduct.variants.find(function (variant) {
          return variant.available;
        }) || currentProduct.variants[0];
      }

      updateVariantUI(initialVariant || null);
      focusFirstElement();
      dialog.scrollTop = 0;
    }

    function fetchSection(url) {
      setLoading(true);
      return fetch(url, {
        credentials: 'same-origin',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Accept: 'text/html'
        }
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error('Failed to load product information.');
          }
          return response.text();
        })
        .then(function (html) {
          var temp = document.createElement('div');
          temp.innerHTML = html;
          var section = temp.querySelector('[data-universal-quick-view-content]');
          if (!section) {
            throw new Error('Quick view template missing.');
          }

          var productScript = section.querySelector('script[data-universal-quick-view-product]');
          currentProduct = null;
          if (productScript) {
            try {
              currentProduct = JSON.parse(productScript.textContent.trim());
            } catch (error) {
              console.warn('Unable to parse quick view product JSON.', error);
            }
            productScript.remove();
          }

          contentTarget.innerHTML = '';
          contentTarget.appendChild(section);
          currentSection = section;
          enhanceSection(section);
          setLoading(false);
          setFeedback('', false);
        })
        .catch(function (error) {
          setLoading(false);
          setFeedback(error.message || 'Something went wrong.', true);
        });
    }

    function trapFocus(event) {
      if (!isOpen || event.key !== 'Tab') return;
      var focusables = getFocusableElements(dialog);
      if (!focusables.length) {
        event.preventDefault();
        dialog.focus();
        return;
      }
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    function handleKeydown(event) {
      if (!isOpen) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }
      trapFocus(event);
    }

    function open(trigger) {
      var url = resolveUrl(trigger);
      if (!url) return;
      activeTrigger = trigger;
      lastFocused = document.activeElement;
      modal.hidden = false;
      if (dialog) {
        dialog.setAttribute('aria-hidden', 'false');
      }
      document.documentElement.classList.add('uqv-no-scroll');
      isOpen = true;
      fetchSection(url);
    }

    function close() {
      if (!isOpen) return;
      isOpen = false;
      document.documentElement.classList.remove('uqv-no-scroll');
      if (dialog) {
        dialog.setAttribute('aria-hidden', 'true');
      }
      modal.hidden = true;
      contentTarget.innerHTML = '';
      currentSection = null;
      currentProduct = null;
      setLoading(false);
      setFeedback('', false);
      if (lastFocused && typeof lastFocused.focus === 'function') {
        lastFocused.focus();
      }
      activeTrigger = null;
    }

    document.addEventListener('click', function (event) {
      var trigger = event.target.closest(TRIGGER_SELECTOR);
      if (trigger) {
        event.preventDefault();
        open(trigger);
        return;
      }

      if (!isOpen) return;
      if (event.target.closest('[data-quick-view-close]')) {
        event.preventDefault();
        close();
      }
    });

    if (backdrop) {
      backdrop.addEventListener('click', function () {
        close();
      });
    }

    closeButtons.forEach(function (button) {
      button.addEventListener('click', function (event) {
        event.preventDefault();
        close();
      });
    });

    document.addEventListener('keydown', handleKeydown);
  });
})();
