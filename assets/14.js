
const customDecorationInput = document.getElementById('customDecorationInput');
const customDecorationUrlInput = document.getElementById('customDecorationUrlInput');
const loadCustomDecorationUrlButton = document.getElementById('loadCustomDecorationUrl');
const customDecorationPreview = document.getElementById('customDecorationPreview');
const decoDataUrlOutput = document.getElementById('deco-dataUrlOutput');

// Function to handle file upload
customDecorationInput.addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
      const dataUrl = e.target.result;
      
      // Display custom decoration preview
      customDecorationPreview.src = dataUrl;
      customDecorationPreview.style.display = 'block';

      // Display Data URL
      decoDataUrlOutput.textContent = dataUrl;
    };
    
    reader.readAsDataURL(file);
  }
});

// Function to handle custom decoration URL input
loadCustomDecorationUrlButton.addEventListener('click', function() {
  const customDecorationUrl = customDecorationUrlInput.value;
  
  if (customDecorationUrl) {
    const img = new Image();
    img.crossOrigin = 'Anonymous'; // This is needed to avoid CORS issues

    img.onload = function() {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      ctx.drawImage(img, 0, 0);

      // Convert custom decoration to Data URL
      const dataUrl = canvas.toDataURL('image/png');

      // Display custom decoration preview
      customDecorationPreview.src = dataUrl;
      customDecorationPreview.style.display = 'block';

      // Display Data URL
      decoDataUrlOutput.textContent = dataUrl;
    };

    img.src = customDecorationUrl;
  }
});






const inputs = {
  name: document.getElementById('deco-name-intput-box'),
  description: document.getElementById('deco-desc-intput-box'),
  id: document.getElementById('deco-skuid-input-box'),
  animatedLink: document.getElementById('deco-animated-link-input-box'),
  staticLink: document.getElementById('deco-static-link-input-box'),
  price: document.getElementById('deco-price-input-box'),
  price2: document.getElementById('deco-price2-input-box')
};

// Define output elements
const outputs = {
  name: document.getElementById('deco-name-output-text'),
  description: document.getElementById('deco-desc-output-text'),
  id: document.getElementById('deco-skuid-output-text'),
  animatedLink: document.getElementById('deco-animated-link-output-text'),
  staticLink: document.getElementById('deco-static-link-output-text'),
  price: document.getElementById('deco-price-output-text'),
  price2: document.getElementById('deco-price2-output-text')
};

const decoImagePreview = document.getElementById('customDecorationPreview');
const decoPreviewCard = document.getElementById('deco-preview-card');
let DecoStaticLink = '';
let DecoAnimatedLink = '';

// Add event listeners to update text live
for (const key in inputs) {
  inputs[key].addEventListener('input', function() {
      outputs[key].textContent = `${inputs[key].value}`;

      if (key === 'staticLink') {
        DecoStaticLink = inputs.staticLink.value;
        decoImagePreview.src = DecoStaticLink;
    } else if (key === 'animatedLink') {
      DecoAnimatedLink = inputs.animatedLink.value;
    }
  });
}

decoPreviewCard.addEventListener('mouseenter', function() {
  if (DecoAnimatedLink) {
    decoImagePreview.src = DecoAnimatedLink;
  }
});

// Reset image source to static link on mouse leave
decoPreviewCard.addEventListener('mouseleave', function() {
  if (DecoStaticLink) {
    decoImagePreview.src = DecoStaticLink;
  }
});

// Load JSON from textarea into inputs
document.getElementById('deco-load-json-button').addEventListener('click', function() {
  try {
      const jsonData = JSON.parse(document.getElementById('deco-json-input').value);
      
      // Populate the input fields with the JSON data
      inputs.name.value = jsonData.name || "";
      inputs.description.value = jsonData.summary || "";
      inputs.id.value = jsonData.sku_id || "";
      inputs.price.value = jsonData.price || "";
      inputs.price2.value = jsonData.price_nitro || "";
      inputs.staticLink.value = jsonData.items[0].static || "";
      inputs.animatedLink.value = jsonData.items[0].animated || "";

      // Trigger input events to update the live preview
      for (const key in inputs) {
          inputs[key].dispatchEvent(new Event('input'));
      }
  } catch (e) {
      alert("Invalid JSON! Please check the format.");
  }
});

// Copy button functionality
document.getElementById('custom-deco-copy-button').addEventListener('click', function() {
  // Create JSON string for API use
  const jsonData = {
      name: inputs.name.value,
      summary: inputs.description.value,
      sku_id: inputs.id.value,
      price: inputs.price.value,
      price_nitro: inputs.price2.value,
      unpublished_at: null,
      isNew: "false",
      emojiCopy: null,
      items: [
          {
              item_type: "deco",
              name: inputs.name.value,
              static: inputs.staticLink.value,
              animated: inputs.animatedLink.value,
              summary: inputs.description.value
          }
      ]
  };

  // Stringify JSON data with indentation for better formatting
  const jsonString = JSON.stringify(jsonData, null, 4);

  // Create a temporary textarea to hold the text
  const tempTextarea = document.createElement('textarea');
  tempTextarea.value = jsonString;
  document.body.appendChild(tempTextarea);
  tempTextarea.select();
  document.execCommand('copy');
  document.body.removeChild(tempTextarea);
});





const customEffectInput = document.getElementById('customEffectInput');
const customEffectUrlInput = document.getElementById('customEffectUrlInput');
const loadCustomEffectUrlButton = document.getElementById('loadCustomEffectUrl');
const customEffectPreview = document.getElementById('customEffectPreview');
const effectDataUrlOutput = document.getElementById('effect-dataUrlOutput');

// Function to handle file upload
customEffectInput.addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
      const dataUrl = e.target.result;
      
      // Display custom Effect preview
      customEffectPreview.src = dataUrl;
      customEffectPreview.style.display = 'block';

      // Display Data URL
      effectDataUrlOutput.textContent = dataUrl;
    };
    
    reader.readAsDataURL(file);
  }
});

// Function to handle custom Effect URL input
loadCustomEffectUrlButton.addEventListener('click', function() {
  const customEffectUrl = customEffectUrlInput.value;
  
  if (customEffectUrl) {
    const img = new Image();
    img.crossOrigin = 'Anonymous'; // This is needed to avoid CORS issues

    img.onload = function() {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      ctx.drawImage(img, 0, 0);

      // Convert custom Effect to Data URL
      const dataUrl = canvas.toDataURL('image/png');

      // Display custom Effect preview
      customEffectPreview.src = dataUrl;
      customEffectPreview.style.display = 'block';

      // Display Data URL
      effectDataUrlOutput.textContent = dataUrl;
    };

    img.src = customEffectUrl;
  }
});






const effectinputs = {
  name: document.getElementById('effect-name-intput-box'),
  description: document.getElementById('effect-desc-intput-box'),
  id: document.getElementById('effect-skuid-input-box'),
  animatedLink: document.getElementById('effect-animated-link-input-box'),
  staticLink: document.getElementById('effect-static-link-input-box'),
  price: document.getElementById('effect-price-input-box'),
  price2: document.getElementById('effect-price2-input-box')
};

// Define output elements
const effectoutputs = {
  name: document.getElementById('effect-name-output-text'),
  description: document.getElementById('effect-desc-output-text'),
  id: document.getElementById('effect-skuid-output-text'),
  animatedLink: document.getElementById('effect-animated-link-output-text'),
  staticLink: document.getElementById('effect-static-link-output-text'),
  price: document.getElementById('effect-price-output-text'),
  price2: document.getElementById('effect-price2-output-text')
};

const effectImagePreview = document.getElementById('customEffectPreview');
const effectPreviewCard = document.getElementById('effect-preview-card');
let effectStaticLink = '';
let effectAnimatedLink = '';

// Add event listeners to update text live
for (const key in effectinputs) {
  effectinputs[key].addEventListener('input', function() {
    effectoutputs[key].textContent = `${effectinputs[key].value}`;

      if (key === 'staticLink') {
        effectStaticLink = effectinputs.staticLink.value;
        effectImagePreview.src = effectStaticLink;
    } else if (key === 'animatedLink') {
      effectAnimatedLink = effectinputs.animatedLink.value;
    }
  });
}

effectPreviewCard.addEventListener('mouseenter', function() {
  if (effectAnimatedLink) {
    effectImagePreview.src = effectAnimatedLink;
  }
});

// Reset image source to static link on mouse leave
effectPreviewCard.addEventListener('mouseleave', function() {
  if (effectStaticLink) {
    effectImagePreview.src = effectStaticLink;
  }
});

// Load JSON from textarea into inputs
document.getElementById('effect-load-json-button').addEventListener('click', function() {
  try {
      const jsonData = JSON.parse(document.getElementById('effect-json-input').value);
      
      // Populate the input fields with the JSON data
      effectinputs.name.value = jsonData.name || "";
      effectinputs.description.value = jsonData.summary || "";
      effectinputs.id.value = jsonData.sku_id || "";
      effectinputs.price.value = jsonData.price || "";
      effectinputs.price2.value = jsonData.price_nitro || "";
      effectinputs.staticLink.value = jsonData.items[0].static || "";
      effectinputs.animatedLink.value = jsonData.items[0].animated || "";

      // Trigger input events to update the live preview
      for (const key in effectinputs) {
        effectinputs[key].dispatchEvent(new Event('input'));
      }
  } catch (e) {
      alert("Invalid JSON! Please check the format.");
  }
});

// Copy button functionality
document.getElementById('custom-effect-copy-button').addEventListener('click', function() {
  // Create JSON string for API use
  const jsonData = {
      name: effectinputs.name.value,
      summary: effectinputs.description.value,
      sku_id: effectinputs.id.value,
      price: effectinputs.price.value,
      price_nitro: effectinputs.price2.value,
      unpublished_at: null,
      isNew: "false",
      emojiCopy: null,
      items: [
          {
              item_type: "effect",
              name: effectinputs.name.value,
              static: effectinputs.staticLink.value,
              animated: effectinputs.animatedLink.value,
              summary: effectinputs.description.value
          }
      ]
  };

  // Stringify JSON data with indentation for better formatting
  const jsonString = JSON.stringify(jsonData, null, 4);

  // Create a temporary textarea to hold the text
  const tempTextarea = document.createElement('textarea');
  tempTextarea.value = jsonString;
  document.body.appendChild(tempTextarea);
  tempTextarea.select();
  document.execCommand('copy');
  document.body.removeChild(tempTextarea);
});





document.getElementById('convert-button').addEventListener('click', function() {
  try {
      // Parse the input JSON
      const inputJson = JSON.parse(document.getElementById('api-input').value);

      // Extract values from the input JSON
      const name = inputJson.name;
      const summary = inputJson.summary;
      const sku_id = inputJson.sku_id;
      const asset = inputJson.items[0]?.asset || "";
      const staticLink = `https://cdn.discordapp.com/avatar-decoration-presets/${asset}.png?size=4096&passthrough=false`;
      const animatedLink = `https://cdn.discordapp.com/avatar-decoration-presets/${asset}.png?size=4096&passthrough=true`;

      // Create the converted JSON object
      const convertedJson = {
          name: name,
          summary: summary,
          sku_id: sku_id,
          price: "price",
          price_nitro: "price2",
          unpublished_at: null,
          isNew: "false",
          emojiCopy: null,
          items: [
              {
                  item_type: "deco",
                  name: name,
                  static: staticLink,
                  animated: animatedLink,
                  summary: summary
              }
          ]
      };

      // Display the converted JSON
      document.getElementById('converted-api').value = JSON.stringify(convertedJson, null, 4);
  } catch (e) {
      alert("Invalid JSON! Please check the format.");
  }
});