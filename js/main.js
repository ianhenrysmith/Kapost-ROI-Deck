// Generated by CoffeeScript 1.3.3
(function() {
  var ROICalculator, SlideShowManager;

  SlideShowManager = (function() {

    function SlideShowManager() {
      $(document).pitchdeck({
        link_labels: true
      });
    }

    return SlideShowManager;

  })();

  ROICalculator = (function() {

    function ROICalculator() {
      $('img[rel=tooltip]').tooltip();
      $('#revenue_goal, #average_revenue').live('keyup', this.handle_text);
      $('#funnel_it').live('click', this.funnel);
      $('#rev_it').live('click', this.rev);
    }

    ROICalculator.prototype.handle_text = function() {
      var format_number, ok,
        _this = this;
      format_number = function(x) {
        var pattern;
        x = x.toString();
        pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x)) {
          x = x.replace(pattern, "$1,$2");
        }
        return x;
      };
      ok = true;
      $('#revenue_goal, #average_revenue').each(function(index, value) {
        var val;
        val = parseInt($(value).val().replace(/,/gi, ''));
        if (val <= 0 || isNaN(val)) {
          return ok = false;
        } else {
          return $(value).val(format_number(val));
        }
      });
      if (ok) {
        return $('#funnel_it').removeClass('disabled');
      }
    };

    ROICalculator.prototype.funnel = function() {
      var average_revenue, conversion, e11, e13, e16, e5, e7, e9, format_number, g11, g5, g7, i11, i13, i16, i5, i7, i9, k13, k16, k5, k9, lead, lift, revenue_goal, revenue_marketing;
      if ($(this).hasClass('disabled')) {
        return;
      }
      $("#funnel_1").show().goTo();
      format_number = function(x) {
        var pattern;
        x = x.toString();
        pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x)) {
          x = x.replace(pattern, "$1,$2");
        }
        return x;
      };
      revenue_goal = parseFloat($('#revenue_goal').val().replace(/,/gi, ''));
      average_revenue = parseFloat($('#average_revenue').val().replace(/,/gi, ''));
      revenue_marketing = parseFloat($('#revenue_marketing').val().replace(/,/gi, ''));
      if (isNaN(revenue_marketing) || conversion === "") {
        revenue_marketing = 35;
      }
      conversion = parseFloat($('#conversion').val().replace(/,/gi, ''));
      if (isNaN(conversion) || conversion === "") {
        conversion = 2;
      }
      lead = parseFloat($('#lead').val().replace(/,/gi, ''));
      if (isNaN(lead) || lead === "") {
        lead = 0.25;
      }
      e7 = conversion / 100;
      e11 = lead / 100;
      e16 = Math.round(revenue_goal * revenue_marketing / 100);
      e13 = Math.round(e16 / average_revenue);
      e9 = Math.round(e13 / e11);
      e5 = Math.round(e9 / e7);
      g5 = 0.10012;
      g7 = 0.09345;
      g11 = 0.089785;
      i5 = e5 * (1 + g5);
      i7 = e7 * (1 + g7);
      i9 = i5 * i7;
      i11 = e11 * (1 + g11) * 100;
      i13 = i9 * i11 / 100;
      i16 = i13 * average_revenue;
      i5 = Math.round(i5);
      i9 = Math.round(i9);
      i13 = Math.round(i13);
      i16 = Math.round(i16);
      k5 = i5 - e5;
      k9 = i9 - e9;
      k13 = i13 - e13;
      k16 = i16 - e16;
      lift = Math.round((i5 * 100 / e5) - 100);
      if (lead < 1) {
        lead = lead.toFixed(2).toString().replace('0.', '.');
      }
      if (i7 < 1) {
        i7 = (i7 * 100).toFixed(2).toString().replace('0.', '.');
      }
      if (i11 < 1) {
        i11 = i11.toFixed(2).toString().replace('0.', '.');
      }
      if (lift < 1) {
        i11 = lift.toFixed(2).toString().replace('0.', '.');
      }
      $('.conversion.leads .value').text("" + conversion + "%");
      $('.conversion.customers .value').text("" + lead + "%");
      $('.machine_conversion.lift .value').text("" + lift + "%");
      $('.machine_conversion.new_leads .value').text("" + i7 + "%");
      $('.machine_conversion.new_customers .value').text("" + i11 + "%");
      $('.funnel .value.visitors').text("" + (format_number(e5)));
      $('.funnel .value.leads').text("" + (format_number(e9)));
      $('.funnel .value.customers').text("" + (format_number(e13)));
      $('.funnel_value').text("$" + (format_number(e16)));
      $('.funnel_2 .value.visitors').append("<span class='new'>" + (format_number(i5)) + "</span>");
      $('.funnel_2 .value.leads').append("<span class='new'>" + (format_number(i9)) + "</span>");
      $('.funnel_2 .value.customers').append("<span class='new'>" + (format_number(i13)) + "</span>");
      $('#funnel_2 .funnel_value').append("<span class='new'>$" + (format_number(i16)) + "</span>");
      $('#funnel_2 .gains.visitors .value').text(format_number(k5));
      $('#funnel_2 .gains.leads .value').text(format_number(k9));
      $('#funnel_2 .gains.customers .value').text(format_number(k13));
      return $('#funnel_2 .gains.revenue .value').text("$" + (format_number(k16)));
    };

    ROICalculator.prototype.rev = function() {
      return $("#funnel_2").show().goTo();
    };

    return ROICalculator;

  })();

  $(document).ready(function() {
    $(".fancyVideo").live('click', function() {
      $.fancybox({
        'width': 800,
        'height': 482,
        'href': this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
        'type': 'swf',
        'swf': {
          'wmode': 'transparent',
          'allowfullscreen': 'true'
        }
      });
      return false;
    });
    new ROICalculator;
    return new SlideShowManager;
  });

  (function($) {
    return $.fn.goTo = function() {
      $('html, body').animate({
        scrollTop: $(this).offset().top - 90 + 'px'
      }, 'slow');
      return this;
    };
  })(jQuery);

}).call(this);
