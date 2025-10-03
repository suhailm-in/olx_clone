import { useEffect } from "react";

function CustomHelmet({ title, description }) {
  useEffect(() => {
    if (title) document.title = title;

    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", description);
    }

    // Optional: clean up if needed
    return () => {
      if (title) document.title = "Default App Title"; // fallback
      if (description) {
        const meta = document.querySelector('meta[name="description"]');
        if (meta) meta.setAttribute("content", "Default description");
      }
    };
  }, [title, description]);

  return null; // no UI component
}

export default CustomHelmet;
