// (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';


// },{}]},{},[1])

var callback = function(){
  // Application state
  let data = {
    donor_count: 70,
    donation_goal: 5000,
    total_donated: 1500,
    goal_reached: false,
    increment: 50
  }

  // Elements in the DOM that are interacted with
  let donate_button = document.querySelector("#donate-button");
  let donor_count_elem = document.querySelector("#donor-count");
  let donation_amount_left_elem = document.querySelector("#amount-left");
  let tooltip = document.querySelector(".tooltip");
  let progress_bar = document.querySelector("#progress");
  let success_message = document.querySelector("#success");
  let error_message = document.querySelector("#error");

  let initializeValues = function() {
    donor_count_elem.innerHTML = data.donor_count;
    updateProgress();
    updateTooltip();
  }

  let isValidIncrement = function(amount) {
    error_message.style.display = 'none';
    success_message.style.display = 'none';
    if(amount % 50 === 0) {
      success_message.style.display = 'block';
      return true;
    } else {
      error_message.style.display = 'block';
      return false;
    }
  }

  let updateDonationData = function(amount) {
    data.total_donated += amount;
    data.donor_count += 1;

    donor_count_elem.innerHTML = data.donor_count;
    return;
  }

  let updateProgress = function() {
    let progress_percent = (data.total_donated/data.donation_goal)*100;
    if(progress_percent < 100) {
      progress_bar.style.width = Math.floor(progress_percent).toString() + '%';
    } else {
      updateGoalReached();
    }
    return;
  }

  let updateTooltip = function() {
    let amount_left = data.donation_goal - data.total_donated;

    if (amount_left > 0) {
      donation_amount_left_elem.innerHTML = amount_left;
    } else {
      tooltip.innerHTML = "Whoop! Our goal as been reached!";
    }
    return;
  }

  let updateGoalReached = function() {
    progress_bar.style.backgroundColor = '#8bbe0f';
    progress_bar.style.width = "100%";
    data.goal_reached = true;
  }

  //Initialize values on first window load
  initializeValues();

  donate_button.onclick = function() {
    let donatation_value = parseInt(document.querySelector("#donation-amount").value);
    let valid_increment = isValidIncrement(donatation_value);

    console.log(valid_increment);
    if(valid_increment === true) {
      updateDonationData(donatation_value);

      if(!data.goal_reached) {
        updateProgress();
        updateTooltip();
      }
    }
  }
};

if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  callback();
} else {
  document.addEventListener("DOMContentLoaded", callback);
}
