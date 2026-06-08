(function attachProductSearchWidget(global) {
  "use strict";

  var STYLE_ID = "product-search-widget-styles";
  var DEFAULT_IMAGE =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 420'%3E%3Crect width='640' height='420' fill='%23e9efe9'/%3E%3Cpath d='M160 280l92-100 74 76 62-56 92 80' fill='none' stroke='%23859a8d' stroke-width='22' stroke-linecap='round' stroke-linejoin='round'/%3E%3Ccircle cx='238' cy='144' r='34' fill='%23859a8d'/%3E%3C/svg%3E";
  var INJECTED_STYLE = [
    ":root {",
    "  --psw-panel: rgba(255, 255, 255, 0.96);",
    "  --psw-ink: #163126;",
    "  --psw-muted: #5d7267;",
    "  --psw-line: rgba(22, 49, 38, 0.12);",
    "  --psw-accent: #1e8e64;",
    "  --psw-accent-soft: rgba(30, 142, 100, 0.12);",
    "  --psw-shadow: 0 24px 48px rgba(18, 45, 35, 0.16);",
    "}",
    ".psw-mount {",
    "  width: min(860px, 100%);",
    "  margin: 0 auto;",
    "}",
    ".psw-shell {",
    "  position: relative;",
    "  width: 100%;",
    "  z-index: 10;",
    "}",
    ".psw-form {",
    "  display: block;",
    "}",
    ".psw-searchbox {",
    "  display: grid;",
    "  grid-template-columns: 24px minmax(0, 1fr);",
    "  align-items: center;",
    "  gap: 12px;",
    "  width: 100%;",
    "  min-height: 68px;",
    "  padding: 0 22px;",
    "  border: 1px solid rgba(22, 49, 38, 0.14);",
    "  border-radius: 999px;",
    "  background: rgba(255, 255, 255, 0.94);",
    "  box-shadow: 0 16px 30px rgba(18, 45, 35, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8);",
    "}",
    ".psw-searchbox:focus-within {",
    "  border-color: rgba(30, 142, 100, 0.42);",
    "  box-shadow: 0 0 0 4px rgba(30, 142, 100, 0.12);",
    "}",
    ".psw-searchbox svg {",
    "  width: 24px;",
    "  height: 24px;",
    "  color: var(--psw-accent);",
    "}",
    ".psw-input {",
    "  width: 100%;",
    "  border: 0;",
    "  outline: 0;",
    "  background: transparent;",
    "  color: var(--psw-ink);",
    "  font: 500 1.08rem/1.4 'Trebuchet MS', 'Segoe UI', sans-serif;",
    "}",
    ".psw-input::placeholder {",
    "  color: #8a978f;",
    "}",
    ".psw-results {",
    "  position: absolute;",
    "  top: calc(100% + 14px);",
    "  left: 0;",
    "  right: 0;",
    "  display: grid;",
    "  gap: 14px;",
    "  padding: 18px;",
    "  border: 1px solid var(--psw-line);",
    "  border-radius: 28px;",
    "  background: var(--psw-panel);",
    "  box-shadow: var(--psw-shadow);",
    "  backdrop-filter: blur(16px);",
    "}",
    ".psw-results[hidden] {",
    "  display: none;",
    "}",
    ".psw-meta {",
    "  min-height: 22px;",
    "  text-align: left;",
    "  color: var(--psw-muted);",
    "  font: 400 0.96rem/1.5 Georgia, 'Times New Roman', serif;",
    "}",
    ".psw-grid {",
    "  display: grid;",
    "  grid-template-columns: repeat(3, 1fr);",
    "  gap: 18px;",
    "}",
    ".psw-card {",
    "  display: grid;",
    "  gap: 14px;",
    "  min-height: 100%;",
    "  padding: 18px;",
    "  border: 1px solid var(--psw-line);",
    "  border-radius: 26px;",
    "  background: var(--psw-panel);",
    "  box-shadow: 0 16px 32px rgba(18, 45, 35, 0.08);",
    "}",
    ".psw-card-media {",
    "  aspect-ratio: 16 / 11;",
    "  overflow: hidden;",
    "  border-radius: 20px;",
    "  background: linear-gradient(135deg, #f1f4f0, #dce7df);",
    "}",
    ".psw-card-media img {",
    "  width: 100%;",
    "  height: 100%;",
    "  object-fit: cover;",
    "  display: block;",
    "}",
    ".psw-card-body {",
    "  display: grid;",
    "  gap: 10px;",
    "  grid-template-rows: auto 1fr auto;",
    "  align-content: start;",
    "}",
    ".psw-card-title {",
    "  margin: 0;",
    "  color: var(--psw-ink);",
    "  font: 700 1.15rem/1.3 'Trebuchet MS', 'Segoe UI', sans-serif;",
    "}",
    ".psw-card-desc {",
    "  display: -webkit-box;",
    "  margin: 0;",
    "  overflow: hidden;",
    "  color: var(--psw-muted);",
    "  font: 400 0.95rem/1.55 Georgia, 'Times New Roman', serif;",
    "  -webkit-line-clamp: 3;",
    "  -webkit-box-orient: vertical;",
    "}",
    ".psw-card-footer {",
    "  display: flex;",
    "  justify-content: space-between;",
    "  align-items: center;",
    "  gap: 12px;",
    "  margin-top: 6px;",
    "}",
    ".psw-price {",
    "  color: var(--psw-ink);",
    "  font: 700 1rem/1 'Trebuchet MS', 'Segoe UI', sans-serif;",
    "}",
    ".psw-link {",
    "  display: inline-flex;",
    "  align-items: center;",
    "  justify-content: center;",
    "  min-height: 40px;",
    "  padding: 0 16px;",
    "  border-radius: 999px;",
    "  background: #12392b;",
    "  color: #fff;",
    "  text-decoration: none;",
    "  font: 700 0.9rem/1 'Trebuchet MS', 'Segoe UI', sans-serif;",
    "}",
    ".psw-empty {",
    "  padding: 24px;",
    "  border: 1px dashed rgba(22, 49, 38, 0.16);",
    "  border-radius: 24px;",
    "  text-align: center;",
    "  color: var(--psw-muted);",
    "  background: rgba(255, 255, 255, 0.56);",
    "  font: 400 1rem/1.6 Georgia, 'Times New Roman', serif;",
    "}",
    "@media (max-width: 768px) {",
    "  .psw-grid {",
    "    grid-template-columns: repeat(2, 1fr);",
    "  }",
    "}",
    "@media (max-width: 425px) {",
    "  .psw-searchbox {",
    "    min-height: 60px;",
    "    padding: 0 18px;",
    "  }",
    "  .psw-results {",
    "    position: static;",
    "    margin-top: 12px;",
    "    padding: 16px;",
    "  }",
    "  .psw-grid {",
    "    grid-template-columns: 1fr;",
    "  }",
    "  .psw-card-footer {",
    "    align-items: stretch;",
    "    flex-direction: column;",
    "  }",
    "  .psw-link {",
    "    width: 100%;",
    "  }",
    "}",
    ""
  ].join("\n");

  function injectStyles(doc) {
    if (doc.getElementById(STYLE_ID)) {
      return;
    }

    var style = doc.createElement("style");
    style.id = STYLE_ID;
    style.textContent = INJECTED_STYLE;
    doc.head.appendChild(style);
  }

  function normalizeText(value) {
    return typeof value === "string" ? value.trim() : "";
  }

  function normalizePrice(value) {
    if (typeof value === "number" && isFinite(value)) {
      return "$" + value.toFixed(2);
    }

    return normalizeText(value) || "Price on request";
  }

  function sanitizeUrl(value, fallback) {
    var source = normalizeText(value);

    if (!source) {
      return fallback;
    }

    if (
      source.indexOf("/") === 0 ||
      source.indexOf("./") === 0 ||
      source.indexOf("../") === 0 ||
      source.indexOf("#") === 0
    ) {
      return source;
    }

    if (/^https?:\/\//i.test(source)) {
      return source;
    }

    return fallback;
  }

  function normalizeProduct(record, fallbackId) {
    var source = record && typeof record === "object" ? record : {};
    var productId = normalizeText(source.productId || source.id || fallbackId);
    var title = normalizeText(source.title || source.name || productId);
    var url = normalizeText(source.pageUrl || source.url || source.href || "#");

    return {
      productId: productId || "product-" + Math.random().toString(36).slice(2, 10),
      title: title || "Untitled product",
      imageUrl: sanitizeUrl(source.imageUrl || source.image || source.imageURL, DEFAULT_IMAGE),
      pageUrl: sanitizeUrl(url, "#"),
      description: normalizeText(
        source.description || source.text || source.summary || source.productText
      ) || "Product details will appear here when available.",
      price: normalizePrice(source.price),
      keywords: Array.isArray(source.keywords)
        ? source.keywords.map(normalizeText).filter(Boolean)
        : []
    };
  }

  function extractProducts(payload) {
    if (Array.isArray(payload)) {
      return payload.map(function mapArrayItem(item, index) {
        return normalizeProduct(item, "product-" + (index + 1));
      });
    }

    if (payload && Array.isArray(payload.products)) {
      return payload.products.map(function mapProduct(item, index) {
        return normalizeProduct(item, "product-" + (index + 1));
      });
    }

    if (payload && payload.productMap && typeof payload.productMap === "object") {
      return Object.keys(payload.productMap).map(function mapObjectItem(key) {
        return normalizeProduct(payload.productMap[key], key);
      });
    }

    if (payload && typeof payload === "object") {
      return Object.keys(payload).map(function mapLooseObject(key) {
        return normalizeProduct(payload[key], key);
      });
    }

    return [];
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function scoreProduct(product, term) {
    var title = product.title.toLowerCase();
    var description = product.description.toLowerCase();
    var productId = product.productId.toLowerCase();
    var keywords = product.keywords.join(" ").toLowerCase();
    var score = 0;

    if (title === term) {
      score += 140;
    } else if (title.indexOf(term) === 0) {
      score += 100;
    } else if (title.indexOf(term) !== -1) {
      score += 70;
    }

    if (keywords.indexOf(term) !== -1) {
      score += 45;
    }

    if (productId.indexOf(term) !== -1) {
      score += 25;
    }

    if (description.indexOf(term) !== -1) {
      score += 18;
    }

    return score;
  }

  function filterProducts(products, query, minChars, limit) {
    var term = normalizeText(query).toLowerCase();

    if (term.length < minChars) {
      return products.slice(0, limit);
    }

    return products
      .map(function addScore(product) {
        return {
          product: product,
          score: scoreProduct(product, term)
        };
      })
      .filter(function keepMatch(entry) {
        return entry.score > 0;
      })
      .sort(function sortMatches(a, b) {
        if (b.score !== a.score) {
          return b.score - a.score;
        }

        return a.product.title.localeCompare(b.product.title);
      })
      .slice(0, limit)
      .map(function unwrap(entry) {
        return entry.product;
      });
  }

  function createMarkup(doc, options) {
    var shell = doc.createElement("section");
    shell.className = "psw-shell";
    shell.innerHTML =
      '  <form class="psw-form" novalidate>' +
      '    <label class="psw-searchbox" aria-label="' +
      escapeHtml(options.label) +
      '">' +
      '      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '        <path d="M10.5 4a6.5 6.5 0 1 0 4.3 11.37l4.42 4.42 1.4-1.4-4.42-4.42A6.5 6.5 0 0 0 10.5 4Zm0 2a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z" fill="currentColor"></path>' +
      "      </svg>" +
      '      <input class="psw-input" type="search" autocomplete="off" spellcheck="false" placeholder="' +
      escapeHtml(options.placeholder) +
      '">' +
      "    </label>" +
      "  </form>" +
      '  <div class="psw-results" hidden>' +
      '    <div class="psw-meta" aria-live="polite"></div>' +
      '    <div class="psw-grid" role="list"></div>' +
      "  </div>";

    return shell;
  }

  function renderProducts(grid, items) {
    if (!items.length) {
      grid.innerHTML =
        '<div class="psw-empty">No matching products were found. Try another keyword or a shorter phrase.</div>';
      return;
    }

    grid.innerHTML = items
      .map(function mapProduct(product) {
        return (
          '<article class="psw-card" role="listitem">' +
          '  <div class="psw-card-media">' +
          '    <img src="' +
          escapeHtml(product.imageUrl) +
          '" alt="' +
          escapeHtml(product.title) +
          '">' +
          "  </div>" +
          '  <div class="psw-card-body">' +
          '    <h3 class="psw-card-title">' +
          escapeHtml(product.title) +
          "</h3>" +
          '    <p class="psw-card-desc">' +
          escapeHtml(product.description) +
          "</p>" +
          '    <div class="psw-card-footer">' +
          '      <span class="psw-price">' +
          escapeHtml(product.price) +
          "</span>" +
          '      <a class="psw-link" href="' +
          escapeHtml(product.pageUrl) +
          '">Open product</a>' +
          "    </div>" +
          "  </div>" +
          "</article>"
        );
      })
      .join("");
  }

  function resolveTarget(doc, target) {
    if (target && typeof target === "string") {
      return doc.querySelector(target);
    }

    if (target && target.nodeType === 1) {
      return target;
    }

    return (
      doc.querySelector("[data-product-search]") ||
      doc.querySelector("header") ||
      doc.querySelector("main") ||
      doc.body
    );
  }

  async function loadData(options) {
    if (options.data) {
      return extractProducts(options.data);
    }

    var response = await fetch(options.dataUrl, {
      method: "GET",
      cache: "no-store",
      credentials: "same-origin",
      headers: {
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(
        "Failed to load products from " +
          options.dataUrl +
          " (" +
          response.status +
          " " +
          response.statusText +
          ")."
      );
    }

    return extractProducts(await response.json());
  }

  function mountSearch(options) {
    var config = Object.assign(
      {
        data: null,
        dataUrl: "",
        target: null,
        minChars: 3,
        maxResults: 8,
        kicker: "Product Search",
        title: "Find products instantly",
        subtitle:
          "Start typing three or more letters to see matching products immediately. No search button is required.",
        placeholder: "Search by product title, ID, or keyword..."
      },
      options || {}
    );
    var minChars = Number(config.minChars) || 3;
    var maxResults = Number(config.maxResults) || 8;
    var headingKicker = normalizeText(config.kicker) || "Product Search";
    var headingTitle = normalizeText(config.title) || "Find products instantly";
    var inputPlaceholder =
      normalizeText(config.placeholder) || "Search by product title, ID, or keyword...";

    if (!config.data && !normalizeText(config.dataUrl)) {
      throw new Error("ProductSearchWidget requires data or dataUrl.");
    }

    var doc = global.document;
    var target = resolveTarget(doc, config.target);

    if (!target) {
      throw new Error("ProductSearchWidget could not find a mount target.");
    }

    injectStyles(doc);

    return loadData(config).then(function handleProducts(products) {
      var validProducts = products.filter(function keepProduct(product) {
        return normalizeText(product.title) || normalizeText(product.productId);
      });
      var shell = createMarkup(doc, {
        label: headingTitle || headingKicker || "Product search",
        placeholder: inputPlaceholder
      });
      var grid = shell.querySelector(".psw-grid");
      var meta = shell.querySelector(".psw-meta");
      var input = shell.querySelector(".psw-input");
      var resultsPanel = shell.querySelector(".psw-results");
      var wrapper =
        target.hasAttribute && target.hasAttribute("data-product-search")
          ? target
          : doc.createElement("div");

      if (wrapper !== target) {
        wrapper.className = "psw-mount";
        target.appendChild(wrapper);
      } else {
        wrapper.innerHTML = "";
        wrapper.classList.add("psw-mount");
      }

      wrapper.appendChild(shell);

      function openResults() {
        resultsPanel.hidden = false;
      }

      function closeResults() {
        resultsPanel.hidden = true;
      }

      function draw(query) {
        var trimmed = normalizeText(query);
        var results;

        if (!trimmed) {
          meta.textContent = "";
          grid.innerHTML = "";
          closeResults();
          return;
        }

        openResults();

        if (trimmed.length < minChars) {
          meta.textContent =
            "Type at least " +
            minChars +
            " letters to search the catalog.";
          grid.innerHTML =
            '<div class="psw-empty">Keep typing to open matching products in this search tray.</div>';
          return;
        }

        results = filterProducts(validProducts, trimmed, minChars, maxResults);

        if (results.length) {
          meta.textContent =
            results.length +
            " matching product" +
            (results.length === 1 ? "" : "s") +
            ' for "' +
            trimmed +
            '".';
        } else {
          meta.textContent = 'No products match "' + trimmed + '".';
        }

        renderProducts(grid, results);
      }

      input.addEventListener("input", function handleInput(event) {
        draw(event.target.value);
      });

      input.addEventListener("focus", function handleFocus() {
        if (normalizeText(input.value)) {
          draw(input.value);
        }
      });

      shell.querySelector(".psw-form").addEventListener("submit", function blockSubmit(event) {
        event.preventDefault();
      });

      shell.addEventListener("keydown", function handleKeydown(event) {
        if (event.key === "Escape") {
          closeResults();
          input.blur();
        }
      });

      doc.addEventListener("click", function handleDocumentClick(event) {
        if (!shell.contains(event.target)) {
          closeResults();
        }
      });

      draw("");

      return {
        element: shell,
        products: validProducts,
        refresh: draw
      };
    });
  }

  function autoMount() {
    var nodes = global.document.querySelectorAll("[data-product-search]");

    nodes.forEach(function mountNode(node) {
      if (node.getAttribute("data-product-search-ready") === "true") {
        return;
      }

      node.setAttribute("data-product-search-ready", "true");
      mountSearch({
        target: node,
        dataUrl: node.getAttribute("data-product-search-source"),
        minChars: Number(node.getAttribute("data-product-search-min-chars")) || 3,
        maxResults: Number(node.getAttribute("data-product-search-limit")) || 8,
        kicker: node.getAttribute("data-product-search-kicker") || undefined,
        title: node.getAttribute("data-product-search-title") || undefined,
        subtitle: node.getAttribute("data-product-search-subtitle") || undefined,
        placeholder: node.getAttribute("data-product-search-placeholder") || undefined
      }).catch(function handleError(error) {
        node.innerHTML =
          '<div class="psw-empty">The product search could not load right now.</div>';
        console.error(error);
      });
    });
  }

  global.ProductSearchWidget = {
    mount: mountSearch,
    autoMount: autoMount
  };

  if (global.document.readyState === "loading") {
    global.document.addEventListener("DOMContentLoaded", autoMount);
  } else {
    autoMount();
  }
})(window);
