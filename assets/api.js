const getReqUrl = (url, obj = {},) => {
  //url是否带有参数
  let str = url.indexOf('?') > -1 ? '' : '?';
  let arr = [];

  for(let key in obj){
      let item = `${key}=${obj[key]}`;
      arr.push(item);
  }
  //有参数才加'?' 没有不加
  str = arr.length ? str : '';
  return url + str + arr.join('&');
};

const isJSONStr = str => {
  if(typeof str === 'string'){
    try {
      let parsedObj = JSON.parse(str);
      if(parsedObj && typeof parsedObj === 'object') {
        return true
      }
      else{
        return false
      }
      
    } catch (err) {
      console.error('invalid json str', err);
      return false
    }
  }
  else{
    return false
  }
}

require(["gitbook"], function(gitbook) {
  gitbook.events.bind("page.change", function() {
    $(".api-header").click(function(event) {
      // $(event.currentTarget).parent().toggleClass('expanded');
    });

    $('#urlParams').blur(function(){
      let val = $(this).val();
      if(!isJSONStr(val)){
        window.alert('invalid json str, please input correct json str');
      }
    })

    $('#data').blur(function(){
      let val = $(this).val();
      if(!isJSONStr(val)){
        window.alert('invalid json str, please input correct json str');
      }
    })

    $(".request-btn").click(function(ev){
      let url = $('#apiUrl').html();
      let method = $('#method').html();
      let urlParams = JSON.parse($('#urlParams').val() || '{}');
      let data = JSON.parse($('#data').val() || '{}');
      let result = $('#result');

      let finalUrl = getReqUrl(url, urlParams)
      $.ajax({
        url: finalUrl,
        type: method.toUpperCase(),
        data,
        success:function (data){
          console.log(data);
          result.val(JSON.stringify(data, undefined, 4))
        },
        error: function(xhr, textStatus, errorThrown){
          console.error(xhr);
          console.error(textStatus);
          console.error(errorThrown);
          result.val(JSON.stringify(textStatus || errorThrown, undefined, 4))
        }
      })
    })
  });
});
