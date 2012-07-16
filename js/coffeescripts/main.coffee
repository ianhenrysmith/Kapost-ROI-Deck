class SlideShowManager
  constructor: () ->
    $(document).pitchdeck({
      link_labels: true
    })

$(document).ready () ->
  new SlideShowManager
  