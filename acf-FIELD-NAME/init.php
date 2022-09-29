<?php
/**
 * Initializes the new ACF field type.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'acf/include_field_types', 'PREFIX_include_acf_field_FIELD_NAME' );
/**
 * Creates a new instance of the ACF field type class.
 *
 * @return void
 */
function PREFIX_include_acf_field_FIELD_NAME() {
	require_once __DIR__ . '/class-PREFIX-acf-field-FIELD-NAME.php';

	/**
	 * Replace '1.0' with your plugin or theme version from a constant/function.
	 *
	 * This value is used so that JS and CSS files in `assets/` are purged from
	 * browser caches when you update your plugin or theme.
	 */
	$version = '1.0';

	/**
	 * The $url is used to enqueue the field's CSS and JS from `assets/`.
	 *
	 * This code attempts to use the URL to the acf-FIELD-NAME directory whether
	 * you added that folder to a theme or plugin.
	 *
	 * In a plugin, $url should be:
	 *
	 * http://example.com/wp-content/plugins/your-plugin-root/[subfolders]/acf-FIELD-NAME
	 *
	 * In a theme, $url should be:
	 *
	 * http://example.com/wp-content/themes/active-theme/[subfolders]/acf-FIELD-NAME
	 *
	 * Simplify this by using existing constants from your theme or plugin code.
	 *
	 */
	$url = site_url( str_replace( ABSPATH, '', __DIR__ ) );

	new \PREFIX_acf_field_FIELD_NAME(
		array(
			'url'     => $url,
			'version' => $version
		)
	);
}
