
; /* Start:"a:4:{s:4:"full";s:104:"/bitrix/templates/dresscode/components/bitrix/system.auth.forgotpasswd/.default/script.js?16262889281179";s:6:"source";s:89:"/bitrix/templates/dresscode/components/bitrix/system.auth.forgotpasswd/.default/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
$(function(){

	//modern mode
	"use strict";

	var authFormSubmit = function(event){

		//jquery vars
		var $form = $(this);
		var $formFields = $form.find("input").removeClass("error");
		var $oneRequiredFields = $form.find(".bx-auth-one-required");
		var $captchaField = $form.find(".bx-auth-captcha-field");

		//other
		var requiredVerification = false;
		var errors = false;

		//check one required fields
		$oneRequiredFields.each(function(){

			//get next element (jquery object)
			var $verificationField = $(this);

			//check filling
			if($verificationField.val() != ""){
				return requiredVerification = true;
			}

		});

		//check one required fields verification
		if(requiredVerification === false){
			$oneRequiredFields.addClass("error");
			errors = true;
		}

		//check captcha
		if($captchaField.length !== 0 && $captchaField.val() == ""){

			//add error class
			$captchaField.addClass("error");

			//set error flag
			errors = true;

		}

		//check errors
		if(errors === true){
			return event.preventDefault();
		}

	};

	//bind
	$(document).on("submit", ".bx-auth-form", authFormSubmit);

});
/* End */
;; /* /bitrix/templates/dresscode/components/bitrix/system.auth.forgotpasswd/.default/script.js?16262889281179*/
