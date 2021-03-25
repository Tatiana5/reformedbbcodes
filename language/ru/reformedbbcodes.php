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
	'RBB_IMG'			=> 'Вставьте ссылку на изображение',
	'RBB_URL'			=> 'Вставьте ссылку',
	'RBB_URL_TEXT'		=> 'Вставьте название ссылки',
	'RBB_MEDIA'			=> 'Вставьте ссылку на видео',
	'RBB_SPOILER_TEXT'	=> 'Вставьте заголовок спойлера',
	'RBB_QUOTE_AUTHOR'	=> 'Вставьте автора цитаты',
	'RBB_LIST_MARKER'	=> 'Вставьте маркер списка. Допустимые значения: 1, I, a, disc, circle, square',
	'RBB_FLASH_SIZE'	=> 'Вставьте размер flash в формате "ширина,высота" (через запятую, без пробела)',
	//
	'RBB_BLACK'			=> 'Черный',
	'RBB_WHITE'			=> 'Белый',
	'RBB_RED'			=> 'Красный',
	'RBB_GREEN'			=> 'Зелёный',
	'RBB_BLUE'			=> 'Синий',
	'RBB_TEAL'			=> 'Бирюзовый ',
	'RBB_GREY'			=> 'Серый',
	'RBB_ORANGE'		=> 'Оранжевый',
	'RBB_YELLOW'		=> 'Жёлтый',
	'RBB_PINK'			=> 'Розовый',
	'RBB_PURPLE'		=> 'Фиолетовый',
	'RBB_CUSTOM_COLOR'	=> 'Пользовательский цвет',
	'RBB_ADD_NEW'		=> 'Добавить цвет',
]);
