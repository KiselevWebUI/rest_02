document.addEventListener("DOMContentLoaded", ()=>{

    const latest_news = document.querySelector('.latest_news');
    const chart_slider = document.querySelector('.chart_slider');
    const sections_legend = document.querySelector('.sections_legend');
    let chartExt = null;
    let chartExtPallete = null;

    function newsPage(){
        const newsForMore = [];
        
        const news_blocks = latest_news.querySelectorAll('.news_block');
        const more_link = document.querySelector(".more_link");
    
        news_blocks.forEach((item) => {
            newsForMore.push(item.outerHTML);
        })
        
        more_link.addEventListener("click", (event) => {
            if(!newsForMore.length){
                more_link.classList.add('hidden');
                return;
            }
            const item = newsForMore.shift();
            latest_news.insertAdjacentHTML("beforeEnd", item);
        });
    }

    function chartPage(){
        const itemLength = 115;
        const slider_content = chart_slider.querySelector('.slider_content');
        const button_black_arrow_left = chart_slider.querySelector('.button_black_arrow_left');
        const button_black_arrow_right = chart_slider.querySelector('.button_black_arrow_right');

        slider_content.addEventListener("click", (event) => {
            if(event.target.dataset && event.target.dataset.key){
                this.curBlock = parseInt(event.target.dataset.key.split(':')[0]);
                slider_content.innerHTML = '';
                this.drawSlider(this.curBlock);
                setChart(chartSource[event.target.dataset.key]);
            }
        });

        button_black_arrow_left.addEventListener("click", (event) => {
            let block = this.chartItemsFromCurMonth.pop();
            this.chartItemsFromCurMonth.unshift(block);
            slider_content.innerHTML = '';
            this.drawSlider(this.curBlock);
        });

        button_black_arrow_right.addEventListener("click", (event) => {
            let block = this.chartItemsFromCurMonth.shift();
            this.chartItemsFromCurMonth.push(block);
            slider_content.innerHTML = '';
            this.drawSlider(this.curBlock);
        });

        window.addEventListener("resize", (event) => {
            clearTimeout(this.resizeStart);
            slider_content.innerHTML = '';
            this.resizeStart = setTimeout(()=>{
                this.drawSlider(this.curBlock);
            }, 100)
        });

        this.resizeStart = null;
        const curMonth = new Date().getMonth();
        

        this.curBlock = curMonth;
        this.chartItemsFromCurMonth = updateChartItems(this.curBlock);

        function updateChartItems(curM){
            let start = chartItems.slice(0, curM-1);
            let end = chartItems.slice(curM-1, chartItems.length);
            return end.concat(start);
        }

        this.drawSlider = function (){
            const chart_slider_width = chart_slider.offsetWidth;
            const slider_content_width = slider_content.offsetWidth;
            const button_black_arrow_left_width = button_black_arrow_left.offsetWidth;
            const button_black_arrow_right_width = button_black_arrow_right.offsetWidth;
            const items = Math.trunc((chart_slider_width - button_black_arrow_left_width - button_black_arrow_right_width)/itemLength);
    
            let str = '';
            
            this.chartItemsFromCurMonth.forEach((item, index) => {
                if(index < items) str += `<a href="javascript:void(0)" data-key="${item.key}" class="slider_block ${ item.id === this.curBlock ? 'slider_block_active' : ''}">${item.name}</a>`;
            })
    
            slider_content.insertAdjacentHTML("beforeEnd", str);
        }

        this.drawSlider(this.curBlock);

        const curSourceId = this.chartItemsFromCurMonth.find((item)=>{
          return item.id === this.curBlock;
        })
        initChart(chartSource[curSourceId.key]);
        initSectionsLegend(chartSource[curSourceId.key]);
    }

    function setChart(source){
      initSectionsLegend(source);
      chartExt.options({
        series: source
      });
    }

    function initSectionsLegend(source){
      let str = '';
      source.forEach((line, index)=>{
        str += `<div class="sections_legend_block">
                        <p>${line.name}</p>
                        <h2 style="color: ${chartExtPallete[index]}">${line.total} GB</h2>
                    </div>`
      })
      sections_legend.innerHTML = '';
      sections_legend.insertAdjacentHTML("beforeEnd", str);
    }

    function initChart(source){ 
      chartExtPallete = JSC.getPalette("default");
      chartExt = JSC.chart('chartDiv', {
        debug: true,
        legend_visible: false,
        title_label_text: 'TB',
        yAxis: [
          { formatString: '' },
          {
            id: 'secondY',
            orientation: 'opposite',
            line_color: '#e2e2e2',
            defaultTick: { enabled: false, gridLine_visible: true },
          },
        ],
        xAxis: {
          crosshair_enabled: true,
          scale: { type: 'date' },
        },
        defaultSeries: {
          type: 'line',
          defaultPoint_marker_visible: false,
          lastPoint: {
            label_text: '<b>%seriesName</b>',
            yAxisTick: { axisId: 'secondY', label_text: '%yValue' },
          },
          firstPoint: {
            label_text: '<b>%seriesName</b>',
            yAxisTick: { axisId: 'secondY', label_text: '%yValue' },
          },
        },
        series: source,
      });
    }

    if(latest_news) newsPage();

    if(chart_slider){
        chartPage();
    }
    
});