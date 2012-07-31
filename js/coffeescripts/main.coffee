class SlideShowManager
  constructor: () ->
    $(document).pitchdeck({
      link_labels: true
    })
    
class ROICalculator
  constructor: () ->
    $('#revenue_goal, #average_revenue').live('keyup', @validate)
    $('#funnel_it').live('click', @funnel)
    $('#rev_it').live('click', @rev)
    
  validate: () ->
    ok = true
    $('#revenue_goal, #average_revenue').each (index, value) =>
      val = parseInt($(value).val())
      if val <= 0 or isNaN(val) then ok = false
    
    if ok then $('#funnel_it').removeClass('disabled')
    
  funnel: () ->
    if $(this).hasClass('disabled') then return
    $("#funnel_1").show()
    
    format_number = (x) ->
      x = x.toString()
      pattern = /(-?\d+)(\d{3})/
      while (pattern.test(x))
        x = x.replace(pattern, "$1,$2")
      return x
    
    revenue_goal = parseInt($('#revenue_goal').val().replace(/,/gi, ''))
    average_revenue = parseInt($('#average_revenue').val().replace(/,/gi, ''))
    revenue_marketing = parseInt($('#revenue_marketing').val().replace(/,/gi, ''))
    if isNaN(revenue_marketing) or conversion == ""
      revenue_marketing = 35
    conversion = parseInt($('#conversion').val().replace(/,/gi, ''))
    if isNaN(conversion) or conversion == ""
      conversion = 2
    lead = parseInt($('#lead').val().replace(/,/gi, ''))
    if isNaN(lead) or lead == ""
      lead = 0.25
      
    
    e7 = conversion / 100
    e11 = lead / 100
    e16 = revenue_goal * revenue_marketing / 100
    e13 = e16 / average_revenue
    e9 = e13 / e11
    e5 = e9 / e7
    
    g5 = 0.10012
    g7 = 0.09345
    g11 = 0.089785
    
    i5 = e5*(1 + g5)
    i7 = e7*(1 + g7)
    i9 = i5*i7
    i11 = e11*(1 + g11)
    i13 = i9*i11
    i16 = i13*average_revenue
    
    i5 = Math.round(i5)
    i9 = Math.round(i9)
    i13 = Math.round(i13)
    i16 = Math.round(i16)
    
    k5 = i5 - e5
    k9 = i9 - e9
    k13 = i13 - e13
    k16 = i16 - e16
      
    $('.conversion.leads .value').text("#{conversion}%")
    $('.conversion.customers .value').text("#{lead}%")
    
    $('.funnel .value.visitors').text("#{format_number e5}")
    $('.funnel .value.leads').text("#{format_number e9}")
    $('.funnel .value.customers').text("#{format_number e13}")
    $('.funnel_value').text("$#{format_number e16}")
    
    $('.funnel_2 .value.visitors').append("<span class='new'>#{format_number i5}</span>")
    $('.funnel_2 .value.leads').append("<span class='new'>#{format_number i9}</span>")
    $('.funnel_2 .value.customers').append("<span class='new'>#{format_number i13}</span>")
    $('#funnel_2 .funnel_value').append("<span class='new'>$#{format_number i16}</span>")
      
    $('#funnel_2 .gains.visitors .value').text(format_number k5)
    $('#funnel_2 .gains.leads .value').text(format_number k9)
    $('#funnel_2 .gains.customers .value').text(format_number k13)
    $('#funnel_2 .gains.revenue .value').text("$#{format_number k16}")
    
  rev: () ->
    $("#funnel_2").show()

$(document).ready () ->
  # $.stellar({
  #   hideDistantElements: false
  # })
  
  new ROICalculator
  new SlideShowManager

  