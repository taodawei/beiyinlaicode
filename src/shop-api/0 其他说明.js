//获取所有接口名称
function getAllApiNames() {
  var list = [];
  $("a.a-target-btn.sub-title").each((i, item) => {
    list.push(item.innerText);
  });
  return list;
}

getAllApiNames();
