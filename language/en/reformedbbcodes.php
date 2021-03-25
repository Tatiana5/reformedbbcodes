<?php
/**
 *
 * @package       reformedbbcodes
 * @copyright (c) 2021 Татьяна5
 * @license       http://opensource.org/licenses/gpl-2.0.php GNU General Public License v2
 *
 */

/**
 * DO NOT CHANGE
 */
if (!defined('IN_PHPBB'))
{
	exit;
}

if (empty($lang) || !is_array($lang))
{
	$lang = [];
}

$lang = array_merge($lang, [
	'RBB_IMG'			=> 'Insert image url',
	'RBB_URL'			=> 'Insert url',
	'RBB_URL_TEXT'		=> 'Insert link title',
	'RBB_MEDIA'			=> 'Insert media url',
	'RBB_SPOILER_TEXT'	=> 'Insert spoiler header',
	'RBB_QUOTE_AUTHOR'	=> 'Insert quote author',
	'RBB_LIST_MARKER'	=> 'Insert a list marker. Allowed values: 1, I, a, disc, circle, square',
	'RBB_FLASH_SIZE'	=> 'Insert the size of the flash in the format "width,height" (separated by commas, no space)',
	//
	'RBB_BLACK'			=> 'Black',
	'RBB_WHITE'			=> 'White',
	'RBB_RED'			=> 'Red',
	'RBB_GREEN'			=> 'Green',
	'RBB_BLUE'			=> 'Blue',
	'RBB_TEAL'			=> 'Teal',
	'RBB_GREY'			=> 'Grey',
	'RBB_ORANGE'		=> 'Orange',
	'RBB_YELLOW'		=> 'Yellow',
	'RBB_PINK'			=> 'Pink',
	'RBB_PURPLE'		=> 'Purple',
	'RBB_CUSTOM_COLOR'	=> 'Custom Color',
	'RBB_ADD_NEW'		=> 'Add new',
]);
