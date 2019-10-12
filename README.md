# sichuan_instrument_visualization

> 川仪可视化

## Build Setup

``` bash
# 首次运行项目请在控制台运行此命令
npm install

# 运行项目命令，运行后项目地址为： localhost:8081
npm run dev

# 项目打包命令，打包后会在根目录创建一个dist文件
npm run build

# 查看打包文件空间占用命令
npm run build --report
```

初始化项目CSS文件路径：/static/style/base.css

项目图片文件路径：/src/assets/../xxx.png

各图表代码位置：/src/components/../xxx.vue

方法位置：/src/utils/tools.js

图表布局位置：/src/views/index.vue

第三方cdn引入位置：/index.html

外部引入数据位置：/static/mock/xxx.json // 部分图表数据为内部数组，修改为外部引入地址即可