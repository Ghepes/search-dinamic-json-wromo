const WebsiteMapping = {
  web: {
    containerId: "product-card",
    fields: {
      productId: 0, // Column A
      title: 1, // Column B
      imageUrl: 2, // Column C
      pageUrl: 3, // Column D
      description: 4, // Column E
      price: 5, // Column F
      keywords: 6 // Column G
    }
  }
};

if (typeof window !== "undefined") {
  window.WebsiteMapping = WebsiteMapping;
}
