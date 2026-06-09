# search-dinamic-json-wromo
Dynamic json data added to any website your Search Bar :  by Wromo.com  (Iulian Ghepes)

### The search bar is automatically positioned in the middle of the web page and has its own section in the header: olso has its own design.


## Add to end header new <div ... :
````
<div
          data-product-search
          data-product-search-source="./products.json"
          data-product-search-title="Search products"
          data-product-search-kicker="Header Search"
          data-product-search-subtitle="The search field stays compact and opens results in a separate tray."
          data-product-search-placeholder="Search the catalog..."
          data-product-search-min-chars="3"
          data-product-search-limit="8"
        ></div>
</header>
````

## Add to end body new script url:
````

<script src="https://cdn.jsdelivr.net/npm/search-dinamic-json-wromo@1.0.0/sheet-search.js" defer=""></script>
    </body>
</html>
````

![Search banner image website](/img/image.png)


## Attach products.json file product data. (Search bar searches for words from "keywords")
## Add file Name: products.json
## The format of products in json file will look like this:

````
{
  "productMap": {
    "orion-desk-lamp": {
      "productId": "orion-desk-lamp",
      "title": "Orion Desk Lamp",
      "imageUrl": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
      "pageUrl": "/products/orion-desk-lamp",
      "description": "A slim brass desk lamp with warm LED light and a dimmable touch base for focused workspaces.",
      "price": "$129.00",
      "keywords": ["lamp", "desk", "lighting", "office"]
    },
    "orion2-desk-lamp": {
      "productId": "orion2-desk-lamp",
      "title": "Master Desk Lamp",
      "imageUrl": "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=80",
      "pageUrl": "/products/orion2-desk-lamp",
      "description": "New slim brass desk lamp with warm LED light and a dimmable touch base for focused workspaces.",
      "price": "$964.00",
      "keywords": ["lamp", "desk2", "lighting", "office"]
    },
    "folio-storage-unit": {
      "productId": "folio-storage-unit",
      "title": "Folio Storage Unit",
      "imageUrl": "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=900&q=80",
      "pageUrl": "/products/folio-storage-unit",
      "description": "A modular cabinet system for files, samples, and devices with quiet-close doors.",
      "price": "$412.00",
      "keywords": ["storage", "cabinet", "desktop", "office"]
    }
  }
}
````



Good luck with the search bar!
---

## For excellent security I suggest to add the SRI integrity code:
## For example, you search for it through https://registry.npmjs.org/search-dinamic-json-wromo : this way you choose the correct "integrity" according to the version you are using
````
<script 
  src="https://cdn.jsdelivr.net/npm/search-dinamic-json-wromo@1.0.0/json-search-wromo.js" 
  integrity="sha512-[HASH_NEW_GENERATED_HERE]" 
  crossorigin="anonymous" defer>
</script>
````
## Version 1.0.0 
````
<script 
  src="https://cdn.jsdelivr.net/npm/search-dinamic-json-wromo@1.0.0/json-search-wromo.js" 
  integrity="sha512-bL/o0zKWOvz5NMaBmdd+TGT8EN0Aj36gzNaybs02zjbJHusNt8M9fLoPOSPbPUwJvmWVl2nn6hM//AOWvXx78g==" 
  crossorigin="anonymous" defer>
</script>
````


## Example integrity
![SRI Integrity Example](/img/integrity.png)






---
