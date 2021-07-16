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
      $('.api-content').slideToggle('normal')
      $('.icon-btn-right').toggleClass('arrow-down')
    });

    $(".reset-btn").click(function(ev){
      let initialValue = $('#initialValue').val();
      $('#data').val(initialValue)
    })

    // $('#urlParams').blur(function(){
    //   let val = $(this).val();
    //   if(!isJSONStr(val)){
    //     window.alert('invalid json str, please input correct json str');
    //   }
    // })

    // $('#data').blur(function(){
    //   let val = $(this).val();
    //   if(!isJSONStr(val)){
    //     window.alert('invalid json str, please input correct json str');
    //   }
    // })

    $(".request-btn").click(function(ev){
      let url = $('#apiUrl').val();
      let method = $('#method').val();
      let urlParams = JSON.parse($('#urlParams').val() || '{}');
      let data = JSON.parse($('#data').val() || '{}');
      let result = $('#result');

      let finalUrl = getReqUrl(url, urlParams)
      $(".request-btn").toggleClass('disabled-btn').attr({disabled: true}).html('请求中')
      $.ajax({
        url: url,
        type: method.toUpperCase(),
        data,
        success:function (data){
          console.log(data);
          result.val(JSON.stringify(data, undefined, 4))
          $(".request-btn").toggleClass('disabled-btn').attr({disabled: false}).html('提交请求')
        },
        error: function(xhr, textStatus, errorThrown){
          console.error(xhr);
          console.error(textStatus);
          console.error(errorThrown);
          result.val(JSON.stringify(textStatus || errorThrown, undefined, 4))
          $(".request-btn").toggleClass('disabled-btn').attr({disabled: false}).html('提交请求')
        }
      })
    })
  });
});
