<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'noir-aura' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '2m#UW_RP&54fE]k*5CU3oy&~SCDv04F0^s|]}&u1#o!@q(nOyxCd@pEiJl.$WXsL' );
define( 'SECURE_AUTH_KEY',  'tXpkG-3rm38XLUa)[%P/$FH ek5CS$3fkM`F;^<^1sdM%+M+6UPD)&[2qbBCgCT@' );
define( 'LOGGED_IN_KEY',    'xjBd:U>l:JS9Xa/?@8>~;}y;73[bVl]N~U{x/quiKjH#|Wc0Ato~3 t7]2|MZn9B' );
define( 'NONCE_KEY',        '<QQ3a*O Wkn~^<y;51Lx+r/Y]#xnpss!x4rhn!O#7sH[|]+kyGb}Wv 6}Y}/O?ch' );
define( 'AUTH_SALT',        'm%24H+xkNE*Lrf?IQ4Zc-hR6(EoaO@ic+p_j^${>XNIg>gE[/:$! VBqlsi&P&;c' );
define( 'SECURE_AUTH_SALT', 'MfE6F!g4kWTNHM6AZ ZG(;0i6=zsxUlGKY@Of^Ud^L3 `bV%FH_a*BKr??!9vuu^' );
define( 'LOGGED_IN_SALT',   '_Ez5TL=WovxAd~6_*Vq>pjcZ@@`iD{e3p{X-p=tQt4:giTwA3Z<N~J.Ko2BKs5Aq' );
define( 'NONCE_SALT',       '-H%*#wAJ[[wb#MwH2pXVJU*)?aVK_||$NC(?8^RwGhs3l!%y%UP&B8]G}`E,q&=l' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */
define('JWT_AUTH_SECRET_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36P');


/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
