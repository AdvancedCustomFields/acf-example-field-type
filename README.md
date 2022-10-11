# ACF Example Field Type

Reference code to register a new [Advanced Custom Fields](https://www.advancedcustomfields.com/) field type.

Intended for use in an existing theme or plugin.

## Setup

1. Download this repository:
    - [Download as a ZIP file](https://github.com/advancedcustomfields/acf-example-field-type/archive/refs/heads/main.zip)
    - Or clone with `git clone https://github.com/advancedcustomfields/acf-example-field-type.git`
2. Rename placeholder strings in file names and content such as `FIELD_NAME` manually or with the helper script: 
    - `cd` into the directory and run `npm ci` (requires [Node.js](https://nodejs.org/)).
    - Run `npm run rename` and follow the prompts.
3. Copy the renamed `acf-FIELD-NAME` directory into your theme or plugin.
4. Add this code to your theme or plugin to initialize the new field type, replacing 'acf-FIELD-NAME' with the new folder name:

    ```php
    include_once __DIR__ . '/acf-FIELD-NAME/init.php';    
    ```

You should now see your new field type in the “Field Type” list when you add a new field.

## Customization

- Change your field type's settings and behavior by editing `class-PREFIX-acf-field-FIELD-NAME.php`.
- Edit or remove `field.css` to control the field's appearance when edited by publishers (e.g. on post editor screens).
- Edit or remove `field.js` to adjust the field's behavior when edited by publishers.

If you remove `field.css` or `field.js`, be sure to also remove the `wp_enqueue` calls in `class-PREFIX-acf-field-FIELD-NAME.php`.

If you plan to use the CSS and JS files, update the '1.0' version number in `class-PREFIX-acf-field-FIELD-NAME.php` to use your theme or plugin version number or constant. This helps to invalidate browser caches for your field type assets when you update your theme or plugin.

Refer to the [acf_field class](https://github.com/AdvancedCustomFields/acf/blob/master/includes/fields/class-acf-field.php) for information about available methods to override.
