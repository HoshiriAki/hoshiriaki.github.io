<style>
  .contains-task-list .task-list-item {
    --text: var(--tw-prose-headings);
    --check: var(--primary);
    --disabled: #C3C8DE;
    --border-radius: 10px;
    border-radius: var(--border-radius);
    position: relative;
    padding: 5px;
    display: grid;
    grid-template-columns: 30px auto;
    align-items: center;
  }
  .contains-task-list .task-list-item span {
    color: var(--text);
    position: relative;
    cursor: pointer;
    display: grid;
    align-items: center;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    transition: color 0.3s ease;
  }
  .contains-task-list .task-list-item span::before,
  .contains-task-list .task-list-item span::after {
    content: "";
    position: absolute;
  }
  .contains-task-list .task-list-item span::before {
    height: 2px;
    width: 8px;
    left: -27px;
    background: var(--check);
    border-radius: 2px;
    transition: background 0.3s ease;
  }
  .contains-task-list .task-list-item span:after {
    height: 4px;
    width: 4px;
    top: 8px;
    left: -25px;
    border-radius: 50%;
  }
  .contains-task-list .task-list-item input[type=checkbox] {
    -webkit-appearance: none;
    -moz-appearance: none;
    position: relative;
    height: 15px;
    width: 15px;
    outline: none;
    border: 0;
    margin: 0 15px 0 0;
    cursor: default;
    background: var(--background);
    display: grid;
    align-items: center;
  }
  .contains-task-list .task-list-item input[type=checkbox]::before, .contains-task-list .task-list-item input[type=checkbox]::after {
    content: "";
    position: absolute;
    height: 2px;
    top: auto;
    background: var(--check);
    border-radius: 2px;
  }
  .contains-task-list .task-list-item input[type=checkbox]::before {
    width: 0px;
    right: 60%;
    transform-origin: right bottom;
  }
  .contains-task-list .task-list-item input[type=checkbox]::after {
    width: 0px;
    left: 40%;
    transform-origin: left bottom;
  }
  .contains-task-list .task-list-item input[type=checkbox]:checked::before {
    -webkit-animation: check-01-11 0.4s ease forwards;
            animation: check-01-11 0.4s ease forwards;
  }
  .contains-task-list .task-list-item input[type=checkbox]:checked::after {
    -webkit-animation: check-02-11 0.4s ease forwards;
            animation: check-02-11 0.4s ease forwards;
  }
  .contains-task-list .task-list-item input[type=checkbox]:checked + span {
    color: var(--disabled);
    -webkit-animation: move-11 0.3s ease 0.1s forwards;
            animation: move-11 0.3s ease 0.1s forwards;
  }
  .contains-task-list .task-list-item input[type=checkbox]:checked + span::before {
    background: var(--disabled);
    -webkit-animation: slice-11 0.4s ease forwards;
            animation: slice-11 0.4s ease forwards;
  }
  .contains-task-list .task-list-item input[type=checkbox]:checked + span::after {
    -webkit-animation: firework-11 0.5s ease forwards 0.1s;
            animation: firework-11 0.5s ease forwards 0.1s;
  }

  @-webkit-keyframes move-11 {
    50% {
      padding-left: 8px;
      padding-right: 0px;
    }
    100% {
      padding-right: 4px;
    }
  }

  @keyframes move-11 {
    50% {
      padding-left: 8px;
      padding-right: 0px;
    }
    100% {
      padding-right: 4px;
    }
  }
  @-webkit-keyframes slice-11 {
    60% {
      width: 100%;
      left: 4px;
    }
    100% {
      width: 100%;
      left: -2px;
      padding-left: 0;
    }
  }
  @keyframes slice-11 {
    60% {
      width: 100%;
      left: 4px;
    }
    100% {
      width: 100%;
      left: -2px;
      padding-left: 0;
    }
  }
  @-webkit-keyframes check-01-11 {
    0% {
      width: 4px;
      top: auto;
      transform: rotate(0);
    }
    50% {
      width: 0px;
      top: auto;
      transform: rotate(0);
    }
    51% {
      width: 0px;
      top: 8px;
      transform: rotate(45deg);
    }
    100% {
      width: 5px;
      top: 8px;
      transform: rotate(45deg);
    }
  }
  @keyframes check-01-11 {
    0% {
      width: 4px;
      top: auto;
      transform: rotate(0);
    }
    50% {
      width: 0px;
      top: auto;
      transform: rotate(0);
    }
    51% {
      width: 0px;
      top: 8px;
      transform: rotate(45deg);
    }
    100% {
      width: 5px;
      top: 8px;
      transform: rotate(45deg);
    }
  }
  @-webkit-keyframes check-02-11 {
    0% {
      width: 4px;
      top: auto;
      transform: rotate(0);
    }
    50% {
      width: 0px;
      top: auto;
      transform: rotate(0);
    }
    51% {
      width: 0px;
      top: 8px;
      transform: rotate(-45deg);
    }
    100% {
      width: 10px;
      top: 8px;
      transform: rotate(-45deg);
    }
  }
  @keyframes check-02-11 {
    0% {
      width: 4px;
      top: auto;
      transform: rotate(0);
    }
    50% {
      width: 0px;
      top: auto;
      transform: rotate(0);
    }
    51% {
      width: 0px;
      top: 8px;
      transform: rotate(-45deg);
    }
    100% {
      width: 10px;
      top: 8px;
      transform: rotate(-45deg);
    }
  }
  @-webkit-keyframes firework-11 {
    0% {
      opacity: 1;
      box-shadow: 0 0 0 -2px var(--primary), 0 0 0 -2px var(--primary), 0 0 0 -2px var(--primary), 0 0 0 -2px var(--primary), 0 0 0 -2px var(--primary), 0 0 0 -2px var(--primary);
    }
    30% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      box-shadow: 0 -15px 0 0px var(--primary), 14px -8px 0 0px var(--primary), 14px 8px 0 0px var(--primary), 0 15px 0 0px var(--primary), -14px 8px 0 0px var(--primary), -14px -8px 0 0px var(--primary);
    }
  }
  @keyframes firework-11 {
    0% {
      opacity: 1;
      box-shadow: 0 0 0 -2px var(--primary), 0 0 0 -2px var(--primary), 0 0 0 -2px var(--primary), 0 0 0 -2px var(--primary), 0 0 0 -2px var(--primary), 0 0 0 -2px var(--primary);
    }
    30% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      box-shadow: 0 -15px 0 0px var(--primary), 14px -8px 0 0px var(--primary), 14px 8px 0 0px var(--primary), 0 15px 0 0px var(--primary), -14px 8px 0 0px var(--primary), -14px -8px 0 0px var(--primary);
    }
  }
</style>

# 待办与日程

以下待办，优先度自上而下递减，每周更新：
- [ ] <span>【星空计划】关于民间小饭店的餐饮智能化需求调查。</span>
- [ ] <span>【星空计划】继续个人网站的编写，学习通用框架、美术、通用高级语言、汇编等。</span>
- [ ] <span>【星空计划】寻找新的三进制计算机结构，以此创造出有感情的机器。</span>
- [ ] <span>【星空计划】定义“星空计划”。</span>
- [ ] <span>【兴趣】做完美的少战的语音包(War Thunder)→初试效果→在爱发电创建捐赠计划</span>
- [ ] <span>【网站】配置新域名(project-starfield.cn)</span>
- [ ] <span>【网站】使 旧 · StarField 更加个性化</span>
- [ ] <span>【网站】为 旧 · StarField 网站添加“多语言”功能</span>
- [ ] <span>【基础】为自己活着。</span>


<blockquote class="admonition bdm-important"><span class="bdm-title"><div>以下为 震旦-四年一学期(24/9-25/1)安排 参考</div></span></blockquote>

****

以下为 震旦-四年一学期(24/9-25/1) 计划，最高优先级：
- [ ] <span>1. 撰写、实践并完善《自学计划》
</span>
- [ ] <span>2. 尽量一次通过 大学英语等级考试-四级(CET4)
</span>
- [ ] <span>3. 寻找最合适自己的笔记方式，建立高效的标记格式，建立清晰的命名格式。
</span>
- [ ] <span>4. 仅通过 CET4 后执行：专精 日语
</span>
- [ ] <span>5. 仅通过 CET4 后执行：专精 数学
</span>
- [ ] <span>6. 仅通过 CET4 后执行：专精 心理学
</span>
- [ ] <span>7. 仅通过 CET4 后执行：专精 哲学
</span>
- [ ] <span>8. 仅通过 CET4 后执行：绘画(入门)。
</span>
- [ ] <span>9. 仅通过 CET4 后执行：(更多尚且未知)
</span>
- [ ] <span>10. 上述目标包括本目标在计划过期前必须至少完成 2 个。</span>

****

以下为过去的 24-8 月计划，最高优先级：
- [x] <span>重拾应试英语，目标为CET四级。</span>
- [x] <span>同时学习日语及俄语，CET四级通过之前，无考试要求，能够日常交流即可。</span>
- [x] <span>寻找学习高等数学的切入点，完善高数学习路线。</span>
- [ ] <span>规划时间表，使自己习惯规划生活。</span>
- [ ] <span>绘画(入门)。</span>
- [ ] <span>寻找最合适自己的笔记方式，建立高效的标记格式，建立清晰的命名格式。</span>
- [x] <span>上述目标包括本目标在计划过期前必须至少完成 4 个。</span>

****
