
$(document).ready(function () {

    /* Name: set focus to first input field */
    $('input[name=user_name]').focus();

    /* Job Role: text field revealed when "Other" option is selected */
    $("#other-job").hide()
    $("#title").change(function () {
        let selected = $(this).children(':selected').val()
        if (selected === "other") $("#other-job").show()
        else $("#other-job").hide()
    })

    /* T-Shirt: only display the color options that match the design selected in the "Design" menu */

    /* first hide all t-shirt options */
    $('option[value=cornflowerblue]').hide()
    $('option[value=darkslategrey]').hide()
    $('option[value=gold]').hide()
    $('option[value=steelblue]').hide()
    $('option[value=tomato]').hide()
    $('option[value=dimgrey]').hide()

    $("#design").change(function () {
        let selected = $(this).children(':selected').val()
        if (selected === "js puns") {
            $('option[value=steelblue]').hide()
            $('option[value=tomato]').hide()
            $('option[value=dimgrey]').hide()
            $('option[value=notheme]').hide()
            $('option[value=cornflowerblue]').show().prop("selected", true);
            $('option[value=darkslategrey]').show()
            $('option[value=gold]').show()
        }
        else if (selected === "heart js") {
            $('option[value=cornflowerblue]').hide()
            $('option[value=darkslategrey]').hide()
            $('option[value=gold]').hide()
            $('option[value=notheme]').hide()
            $('option[value=tomato]').show().prop("selected", true)
            $('option[value=steelblue]').show()
            $('option[value=dimgrey]').show()
        } else {
            $('option[value=notheme]').show().prop("selected", true)
            $('option[value=cornflowerblue]').hide()
            $('option[value=darkslategrey]').hide()
            $('option[value=gold]').hide()
            $('option[value=steelblue]').hide()
            $('option[value=tomato]').hide()
            $('option[value=dimgrey]').hide()
        }
    })
    /* Activities */
    let total = 0;

    $(".activities").change(function (e) {

        if (e.target.name === 'js-frameworks') {
            if (e.target.checked) $('input[name=express]').attr("disabled", true)
            else $('input[name=express]').attr("disabled", false)
        }

        if (e.target.name === 'js-libs') {
            if (e.target.checked) $('input[name=node]').attr("disabled", true)
            else $('input[name=node]').attr("disabled", false)
        }

        if (e.target.name === 'express') {
            if (e.target.checked) $('input[name=js-frameworks]').attr("disabled", true)
            else $('input[name=js-frameworks]').attr("disabled", false)
        }

        if (e.target.name === 'node') {
            if (e.target.checked) $('input[name=js-libs]').attr("disabled", true)
            else $('input[name=js-libs]').attr("disabled", false)
        }

        if (e.target.name === 'all') {
            if (e.target.checked) total += 200
            else total -= 200
        }

        if (e.target.name === 'js-frameworks') {
            if (e.target.checked) total += 100
            else total -= 100
        }

        if (e.target.name === 'js-libs') {
            if (e.target.checked) total += 100
            else total -= 100
        }

        if (e.target.name === 'express') {
            if (e.target.checked) total += 100
            else total -= 100
        }

        if (e.target.name === 'node') {
            if (e.target.checked) total += 100
            else total -= 100
        }

        if (e.target.name === 'build-tools') {
            if (e.target.checked) total += 100
            else total -= 100
        }

        if (e.target.name === 'npm') {
            if (e.target.checked) total += 100
            else total -= 100
        }

        $('#totalPrice').html(total);

    });

    /* Payment */
    /* credit card default payment */
    $('select option[value="credit card"]').attr("selected", true);
    /* disable payment without selecting payment options */
    document.getElementById("select_method_disabled").disabled = "true";
    /* default paypal-text not showing */
    document.getElementById("paypal-text").style.display = "none";
    /* default bitcoin-text not showing */
    document.getElementById("bitcoin-text").style.display = "none"
    $("#payment").change(function (e) {

        if (e.target.value === "credit card") {
            $("#paypal-text").hide()
            $("#bitcoin-text").hide()
            $("#credit-card").show()
        }
        else if (e.target.value == "paypal") {
            $("#credit-card").hide()
            $("#bitcoin-text").hide()
            $("#paypal-text").show()
        }
        else if (e.target.value == "bitcoin") {
            $("#credit-card").hide()
            $("#paypal-text").hide()
            $("#bitcoin-text").show()
        } else {
            $("#paypal-text").hide()
            $("#bitcoin-text").hide()
            $("#credit-card").show()
        }
    })

    /* Register */

    /* regex to check if user entered a valid email */
    function isEmail(email) {
        let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

    function hasCreditNum(creditCardNum) {
        let regex = /^[0-9]{13,16}$/
        return regex.test(creditCardNum);
    }

    function hasZipCode(zip) {
        let regex = /^[0-9]{5}$/
        return regex.test(zip);
    }

    function hasCvv(cvv) {
        let regex = /^[0-9]{3}$/
        return regex.test(cvv);
    }

    $("form").submit(function (e) {

        /* check if name input is empty or null */
        let nameInput = $('#name');
        if (nameInput.val() == null || nameInput.val() == '') {
            nameInput.css("border-color", "red");
            e.preventDefault()
        }

        /* check if validly formatted e-mail address */
        let emailInput = $('#mail');
        if (!isEmail(emailInput.val())) {
            emailInput.css("border-color", "red");
            e.preventDefault()
        }

        /* check if validly formatted credit card info */
        let cardNumber = $("#cc-num");
        let zipCode = $("#zip");
        let cvv = $("#cvv");
        if ($("select#payment option:checked").val() === "credit card") {
            if (!hasCreditNum(cardNumber.val())) {
                cardNumber.css("border-color", "red");
                e.preventDefault()
            }
            if (!hasZipCode(zipCode.val())) {
                zipCode.css("border-color", "red");
                e.preventDefault()
            }
            if (!hasCvv(cvv.val())) {
                cvv.css("border-color", "red");
                e.preventDefault()
            }
        }

        /* check if at least one activity is checked */
        if ($('#totalPrice').html() === "0") {
            alert('choose at least one activity!')
            e.preventDefault()
        }










    })

});
