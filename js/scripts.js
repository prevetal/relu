WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]


document.addEventListener('DOMContentLoaded', function () {
	// Products slider
	const warehouseSliders = [],
		warehouseSlider = document.querySelectorAll('.warehouse .swiper')

	warehouseSlider.forEach((el, i) => {
		el.classList.add('warehouse_s' + i)

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

		warehouseSliders.push(new Swiper('.warehouse_s' + i, options))
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


	// Warehouse points
	$('.warehouse .image .point').click(function(e) {
		e.preventDefault()

		let image = $('.warehouse .image'),
			modal = $(this).data('modal')

		image.find('.modal').hide()
		image.find('#' + modal).fadeIn(300)
	})

	$('.warehouse .modal .close_btn').click(function(e) {
		e.preventDefault()

		let modal = $(this).closest('.modal')

		modal.fadeOut(200)
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
})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || BODY.clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Overwrite window width
		WW = window.innerWidth || document.clientWidth || BODY.clientWidth


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