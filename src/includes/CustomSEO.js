import { useEffect } from "react";

const CustomSEO = ({
  title = "OLX Clone",
  description = "Buy and sell products easily",
  url = window.location.href,
  image = "",
  type = "website",
  jsonLd = null,
}) => {
  useEffect(() => {
    document.title = title;

    // Meta description
    let metaDescription = document.querySelector("meta[name='description']");
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description;

    // Open Graph
    const ogTags = [
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
    ];

    ogTags.forEach((tag) => {
      let element = document.querySelector(`meta[property='${tag.property}']`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("property", tag.property);
        document.head.appendChild(element);
      }
      element.setAttribute("content", tag.content);
    });

    // Structured Data (JSON-LD)
    if (jsonLd) {
      let script = document.getElementById("json-ld");
      if (!script) {
        script = document.createElement("script");
        script.type = "application/ld+json";
        script.id = "json-ld";
        document.head.appendChild(script);
      }
      script.text = JSON.stringify(jsonLd);
    }
  }, [title, description, url, image, type, jsonLd]);

  return null;
};

export default CustomSEO;
