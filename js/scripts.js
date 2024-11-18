WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]


document.addEventListener('DOMContentLoaded', function () {
	// Bottom panel
	const bottomPanelSliders = [],
		bottomPanelSlider = document.querySelectorAll('.bottom_panel .swiper')

	bottomPanelSlider.forEach((el, i) => {
		el.classList.add('bottom_panel_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			lazy: true,
			spaceBetween: 16,
			slidesPerView: 'auto',
			on: {
				init: swiper => setHeight(swiper.el.querySelectorAll('.item')),
				resize: swiper => {
					let items = swiper.el.querySelectorAll('.item')

					items.forEach(el => el.style.height = 'auto')

					setHeight(items)
				}
			}
		}

		bottomPanelSliders.push(new Swiper('.bottom_panel_s' + i, options))
	})


	// Menu
	$('header .menu_btn').click(function(e) {
		e.preventDefault()

		let menu = $('header .menu_wrap')

		$(this).toggleClass('active')

		$(this).hasClass('active')
			? menu.find('.menu').css('display', 'flex')
			: menu.find('.menu').css('display', 'none')
	})

	if (WW < 1900) {
		$(document).click(e => {
			if ($(e.target).closest('.menu_wrap').length === 0) {
				$('header .menu_btn').removeClass('active')

				$('header .menu').css('display', 'none')
			}
		})
	}


	// Current task
	$('.current_task .current .spoler_btn').click(function(e) {
		e.preventDefault()

		let parent = $(this).closest('.current_task')

		$(this).toggleClass('active')

		parent.find('.dropdown').slideToggle(300)
	})


	// Bottom panel remove item
	$('.bottom_panel .item .remove_btn').click(function(e) {
		e.preventDefault()
		e.stopPropagation()

	})


	// Change quantity
	$('body').on('click', '.amount .minus', function (e) {
		e.preventDefault()

		const $parent = $(this).closest('.amount'),
			$input = $parent.find('.input'),
			inputVal = parseFloat($input.val()),
			minimum = parseFloat($input.data('minimum')),
			step = parseFloat($input.data('step')),
			unit = $input.data('unit')

		if (inputVal > minimum) $input.val(inputVal - step + unit)
	})

	$('body').on('click', '.amount .plus', function (e) {
		e.preventDefault()

		const $parent = $(this).closest('.amount'),
			$input = $parent.find('.input'),
			inputVal = parseFloat($input.val()),
			maximum = parseFloat($input.data('maximum')),
			step = parseFloat($input.data('step')),
			unit = $input.data('unit')

		if (inputVal < maximum) $input.val(inputVal + step + unit)
	})

	$('.amount .input').keydown(function () {
		const _self = $(this),
			maximum = parseInt(_self.data('maximum'))

		setTimeout(() => {
			if (_self.val() == '' || _self.val() == 0) _self.val(parseInt(_self.data('minimum')))
			if (_self.val() > maximum) _self.val(maximum)
		})
	})


	// Home page
	setHeight(document.querySelectorAll('.home_page .rooms a span'))


	// Weight - Right data - Remove item
	$('.weight .right_data .item .remove_btn').click(function(e) {
		e.preventDefault()
		e.stopPropagation()

	})


	// Exhaust - Right data - Remove item
	$('.exhaust .right_data .item .remove_btn').click(function(e) {
		e.preventDefault()
		e.stopPropagation()

	})


	// Exhaust - Buttons
	$('.exhaust .image .btn').click(function(e) {
		e.preventDefault()

		let modal = $(this).data('modal')

		$('.exhaust .image .exhaust_modal').hide()
		$('#' + modal).fadeIn(300)
	})


	$('.exhaust .exhaust_modal .close_btn').click(function(e) {
		e.preventDefault()

		$('.exhaust .image .exhaust_modal').fadeOut(200)
	})


	// Objec modal
	$('.bottom_panel .item, .weight .right_data .item, .warehouse .image .point, .exhaust .right_data .item').click(function(e) {
		e.preventDefault()

		let modal = $(this).data('modal')

		$('.object_modal').hide()
		$('#' + modal).fadeIn(300)
	})


	$('.object_modal .interaction_btn').click(function(e) {
		e.preventDefault()

		$('.object_modal').hide()
		$('.weight .interaction_data').fadeIn(300)
	})


	$('.object_modal .close_btn').click(function(e) {
		e.preventDefault()

		$('.object_modal').hide()
	})


	// Weight - Interaction data
	$('.weight .interaction_data .close_btn').click(function(e) {
		e.preventDefault()

		$('.weight .interaction_data').hide()
	})


	$('.weight .interaction_data .objects .move_btn').click(function(e) {
		e.preventDefault()

		$('.weight .interaction_data .objects').toggleClass('reverse')
	})


	range1 = $('.interaction_data #range1').ionRangeSlider({
		min: 0.001,
		max: 0.01,
		from: 0.001,
		step: 0.001,
		grid: true,
		postfix: ' г',
		onChange: data => {
			$('.interaction_data .range1 input.from').val(data.from.toFixed(3))
		},
		onUpdate: data => {
			$('.interaction_data .range1 input.from').val(data.from.toFixed(3))
		}
	}).data('ionRangeSlider')

	$('.interaction_data .range1 .input').keyup(function () {
		range1.update({
			from: parseInt($('.interaction_data .range1 input.from').val())
		})
	})


	range2 = $('.interaction_data #range2').ionRangeSlider({
		min: 0.01,
		max: 5.0,
		from: 0.01,
		step: 0.01,
		grid: true,
		postfix: ' г',
		onChange: data => {
			$('.interaction_data .range2 input.from').val(data.from.toFixed(2))
		},
		onUpdate: data => {
			$('.interaction_data .range2 input.from').val(data.from.toFixed(2))
		}
	}).data('ionRangeSlider')

	$('.interaction_data .range1 .input').keyup(function () {
		range1.update({
			from: parseInt($('.interaction_data .range2 input.from').val())
		})
	})


	range3 = $('.interaction_data #range3').ionRangeSlider({
		min: 0,
		max: 100,
		from: 0,
		step: 1,
		grid: true,
		postfix: '%',
		onChange: data => {
			$('.interaction_data .range3 input.from').val(data.from)
		},
		onUpdate: data => {
			$('.interaction_data .range3 input.from').val(data.from)
		}
	}).data('ionRangeSlider')

	$('.interaction_data .range1 .input').keyup(function () {
		range1.update({
			from: parseInt($('.interaction_data .range3 input.from').val())
		})
	})


	range4 = $('.interaction_data #range4').ionRangeSlider({
		min: 0,
		max: 50,
		from: 0,
		step: 0.0001,
		grid: true,
		onChange: data => {
			$('.interaction_data .range4 input.from').val(data.from.toFixed(4))
		},
		onUpdate: data => {
			$('.interaction_data .range4 input.from').val(data.from.toFixed(4))
		}
	}).data('ionRangeSlider')

	$('.interaction_data .range1 .input').keyup(function () {
		range1.update({
			from: parseInt($('.interaction_data .range4 input.from').val())
		})
	})


	range5 = $('.interaction_data #range5').ionRangeSlider({
		min: 0,
		max: 100,
		from: 0,
		step: 0.0001,
		grid: true,
		onChange: data => {
			$('.interaction_data .range5 input.from').val(data.from.toFixed(4))
		},
		onUpdate: data => {
			$('.interaction_data .range5 input.from').val(data.from.toFixed(4))
		}
	}).data('ionRangeSlider')

	$('.interaction_data .range1 .input').keyup(function () {
		range1.update({
			from: parseInt($('.interaction_data .range5 input.from').val())
		})
	})


	range6 = $('.interaction_data #range6').ionRangeSlider({
		from: 0,
		values: ['1/1000 Б', '1/100 Б', '1/50', '1/20', '1/10', '1/5', '1/2', '1'],
		grid: true
	}).data('ionRangeSlider')


	bath_temperature = $('#bath_temperature').ionRangeSlider({
		min: 0,
		max: 100,
		from: 14,
		step: 1,
		grid: true,
		grid_num: 10
	}).data('ionRangeSlider')


	bath_time = $('#bath_time').ionRangeSlider({
		min: 10,
		max: 120,
		from: 24,
		step: 1,
		grid: true,
		grid_num: 11
	}).data('ionRangeSlider')


	mixer_time = $('#mixer_time').ionRangeSlider({
		min: 10,
		max: 120,
		from: 24,
		step: 1,
		grid: true,
		grid_num: 11
	}).data('ionRangeSlider')


	// Select room
	$('.select_room_btn, .select_room_modal .close_btn').click(function(e) {
		e.preventDefault()

		$('.select_room_modal').toggleClass('show')
	})


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.trapFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.placeFocusBack = false
	Fancybox.defaults.l10n = {
		CLOSE: 'Закрыть',
		NEXT: 'Следующий',
		PREV: 'Предыдущий',
		MODAL: 'Вы можете закрыть это модальное окно нажав клавишу ESC'
	}

	Fancybox.defaults.tpl = {
		closeButton: '<button data-fancybox-close class="f-button is-close-btn" title="{{CLOSE}}"><svg><use xlink:href="images/sprite.svg#ic_close"></use></svg></button>',

		main: `<div class="fancybox__container" role="dialog" aria-modal="true" aria-label="{{MODAL}}" tabindex="-1">
			<div class="fancybox__backdrop"></div>
			<div class="fancybox__carousel"></div>
			<div class="fancybox__footer"></div>
		</div>`,
	}


	// Modals
	$('body').on('click', '.modal_btn', function (e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: document.getElementById(e.target.getAttribute('data-modal')),
			type: 'inline'
		}])
	})


	$('body').on('click', '.modal .close_btn', function (e) {
		e.preventDefault()

		Fancybox.close()
	})


	$('body').on('click', 'a[data-type="ajax"]', function (e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: e.target.getAttribute('href'),
			type: 'ajax'
		}], {
			on: {
				reveal: () => {
					let selects = document.querySelectorAll('.task_info select')

					if (selects) {
						selects.forEach(el => {
							NiceSelect.bind(el, {
								placeholder: el.getAttribute('data-placeholder')
							})

							el.addEventListener('change', () => el.classList.add('selected'))
						})
					}
				}
			}
		})
	})


	// Tasks filter
	$('#tasks_modal .filter .btn').click(function(e) {
		e.preventDefault()

		let filter = $(this).data('filter')

		$('#tasks_modal .filter .btn').removeClass('active')
		$(this).addClass('active')

		$('#tasks_modal .task').hide()
		$('#tasks_modal .task.' + filter).fadeIn(100)
	})


	// Chromatograph
	$('.chromatograph .main_data .btn').click(function(e) {
		e.preventDefault()

		$(this).hasClass('yes')
			? $(this).removeClass('yes').addClass('no')
			: $(this).removeClass('no').addClass('yes')
	})


	// Software
	$('.software .full_panel .col_left .links > * > a.sub_link').click(function(e) {
		e.preventDefault()

		$(this).toggleClass('active').next('.sub').slideToggle(300)
	})


	// Accordion
	$('body').on('click', '.accordion .accordion_item .head', function(e) {
		e.preventDefault()

		let item = $(this).closest('.accordion_item'),
			accordion = $(this).closest('.accordion')

		if (item.hasClass('active')) {
			item.removeClass('active').find('.data').slideUp(300)
		} else {
			accordion.find('.accordion_item').removeClass('active')
			accordion.find('.data').slideUp(300)

			item.addClass('active').find('.data').slideDown(300)
		}
	})


	// Custom select - Nice select
	const selects = document.querySelectorAll('select')

	if (selects) {
		selects.forEach(el => {
			NiceSelect.bind(el, {
				placeholder: el.getAttribute('data-placeholder')
			})

			el.addEventListener('change', () => el.classList.add('selected'))
		})
	}
})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || BODY.clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Overwrite window width
		WW = window.innerWidth || document.clientWidth || BODY.clientWidth


		// Home page
		$('.home_page .rooms a span').each(function () {
			$(this).height('auto')
		})

		setHeight(document.querySelectorAll('.home_page .rooms a span'))


		// Mob. version
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 375) document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}
})