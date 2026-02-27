(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);


    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Contact Form Handler
    $('#contactForm').on('submit', function (e) {
        e.preventDefault();

        var form = this;
        var submitButton = $('#submitButton');
        var originalText = submitButton.text();

        // Show loading state
        submitButton.prop('disabled', true).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...');

        var data = new FormData(form);

        fetch("https://formspree.io/f/xojnbqor", {
            method: "POST",
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                // Success state
                submitButton.prop('disabled', false).text(originalText);
                form.reset();
                $('#successMessage').removeClass('d-none alert-danger').addClass('show alert-success').text('Thank you! Your message has been sent successfully. We will contact you soon.');

                // Hide success message after 5 seconds
                setTimeout(function () {
                    $('#successMessage').removeClass('show').addClass('d-none');
                }, 5000);
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        $('#successMessage').removeClass('d-none alert-success').addClass('show alert-danger').text(data["errors"].map(error => error["message"]).join(", "));
                    } else {
                        $('#successMessage').removeClass('d-none alert-success').addClass('show alert-danger').text("Oops! There was a problem submitting your form");
                    }
                    submitButton.prop('disabled', false).text(originalText);
                })
            }
        }).catch(error => {
            $('#successMessage').removeClass('d-none alert-success').addClass('show alert-danger').text("Oops! There was a problem submitting your form");
            submitButton.prop('disabled', false).text(originalText);
        });
    });

    // Custom Cursor Navigation
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', function (e) {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Adding a slight delay for the outline for a trailing effect
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Hover Effect on clickable elements
        const clickables = document.querySelectorAll('a, button, .service-item, .product-item, .btn, input');

        clickables.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.borderColor = 'transparent';
                cursorOutline.style.backgroundColor = 'rgba(0, 209, 249, 0.2)';
            });
            link.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.backgroundColor = 'transparent';
                cursorOutline.style.borderColor = 'rgba(0, 209, 249, 0.5)';
            });
        });
    }

})(jQuery);
