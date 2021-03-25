<?php
/**
 *
 * @package       reformedbbcodes
 * @copyright (c) 2021 Татьяна5
 * @license       http://opensource.org/licenses/gpl-2.0.php GNU General Public License v2
 *
 */

namespace tatiana5\reformedbbcodes\event;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * Event listener
 */
class listener implements EventSubscriberInterface
{
	/** @var \phpbb\template\template */
	protected $template;

	/** @var \phpbb\extension\manager */
	protected $phpbb_extension_manager;

	/**
	 * Constructor
	 *
	 */
	public function __construct(\phpbb\template\template $template,
								\phpbb\extension\manager $phpbb_extension_manager
								)
	{
		$this->template = $template;
		$this->phpbb_extension_manager = $phpbb_extension_manager;
	}

	/**
	 * Assign functions defined in this class to event listeners in the core.
	 *
	 * @return array
	 */
	public static function getSubscribedEvents()
	{
		return [
			'core.user_setup'			=> 'load_language_on_setup',
			'core.page_header_after'	=> 'page_header_after',
		];
	}

	/**
	 * Load language file.
	 *
	 * @param object $event The event object
	 */
	public function load_language_on_setup($event)
	{
		$lang_set_ext = $event['lang_set_ext'];
		$lang_set_ext[] = [
			'ext_name' => 'tatiana5/reformedbbcodes',
			'lang_set' => 'reformedbbcodes',
		];
		$event['lang_set_ext'] = $lang_set_ext;
	}

	public function page_header_after($event) {
		$this->template->assign_var('S_RBB_IS_ABBC3', $this->phpbb_extension_manager->is_enabled('vse/abbc3'));
	}
}
