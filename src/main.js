const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
  {logo:"B", url:"https://www.bilibili.com"},
  {logo:"T", url:"https://www.taobao.com"},
]
// 简化 url 如果是就替换为空
const simplifyUrl = (url)=>{
  return url.replace('https://','')
            .replace('http://','')
            .replace('www.','')
            .replace(/\/.*/,'') //删除 以 / 开头的内容
}
const render = ()=>{
  $siteList.find('li:not(.last)').remove()
  hashMap.forEach((node,index) =>{  //遍历并得到 node 和 索引
    // 创建新的要添加的 li 
    const $li = $(`   
    <li>
      <div class="site">
        <div class="logo">${node.logo[0]}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
         <div class="close">
          <svg class="icon">
            <use xlink:href="#icon-close"></use>
          </svg>
        </div>
      </div>
    </li> `).insertBefore($lastLi)  //将添加的放在添加按钮的前面
    $li.on('click',()=>{
      window.open(node.url)         //点击 li 跳转 替换 a 标签
    })
    $li.on('click','.close',(e)=>{
      e.stopPropagation()           //阻止冒泡和 a 标签冲突
      hashMap.splice(index, 1 )     //从当前索引开始 删除一个
      render()
    })
  })
}
render()
// 给button添加点击事件
$('.addButton').on('click',()=>{
  let url = window.prompt("请输入想添加的网址")
  if(url.indexOf('https') !== 0){
    url = "https://" + url
  }
// 将添加的放进hashMap数组中
  hashMap.push({
    logo:simplifyUrl(url)[0].toUpperCase(),
    url:url
  })
  render()
});
// 页面离开后进行本地存储
window.onbeforeunload = ()=>{
  const string = JSON.stringify(hashMap)
  localStorage.setItem('x',string)
}
// 键盘事件
$(document).on('keypress',(e)=>{
  const {key} = e  //等价于 const key = e.key
  for(let i = 0;i < hashMap.length;i++){
    if(hashMap[i].logo.toLowerCase() === key){
    window.open(hashMap[i].url)
    }
  }
})