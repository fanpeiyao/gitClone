.el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100%;
}
.el-input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
}
.el-input.is-disabled .el-input__inner {
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: #c0c4cc;
    cursor: not-allowed;
}
.el-input--suffix .el-input__inner {
    padding-right: 30px;
}
.el-input__suffix {
    position: absolute;
    height: 100%;
    right: 5px;
    top: 0;
    text-align: center;
    color: #c0c4cc;
    transition: all .3s;
    pointer-events: none;
}
.el-input__suffix-inner {
    pointer-events: all;
}
.el-input__icon, .el-input__prefix {
    height: 100%;
    text-align: center;
    transition: all .3s;
}
.el-input__icon {
    width: 25px;
    line-height: 40px;
}
.el-input__prefix {
    position: absolute;
    left: 5px;
    top: 0;
    color: #c0c4cc;
}
.el-textarea {
    display: inline-block;
    width: 100%;
    vertical-align: bottom;
    font-size: 14px;
}
.el-textarea__inner {
    display: block;
    resize: vertical;
    padding: 5px 15px;
    line-height: 1.5;
    box-sizing: border-box;
    width: 100%;
    font-size: inherit;
    color: #606266;
    background-color: #fff;
    background-image: none;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
.el-input-group__prepend {
    border-right: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}
.el-input-group--prepend .el-input__inner, .el-input-group__append {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}
.el-input-group__append {
    border-left: 0;
}
.el-input-group__append button.el-button, .el-input-group__append div.el-select .el-input__inner, .el-input-group__append div.el-select:hover .el-input__inner, .el-input-group__prepend button.el-button, .el-input-group__prepend div.el-select .el-input__inner, .el-input-group__prepend div.el-select:hover .el-input__inner {
    border-color: transparent;
    background-color: transparent;
    color: inherit;
    border-top: 0;
    border-bottom: 0;
}
.el-input__suffix {
    position: absolute;
    height: 100%;
    right: 5px;
    top: 0;
    text-align: center;
    color: #c0c4cc;
    transition: all .3s;
    pointer-events: none;
}
.el-input__suffix-inner {
    pointer-events: all;
}
.el-select .el-input .el-select__caret {
    color: #c0c4cc;
    font-size: 14px;
    transition: transform .3s;
    transform: rotate(180deg);
    line-height: 16px;
    cursor: pointer;
}
.el-input--medium .el-input__inner {
    height: 36px;
    line-height: 36px;
}
.el-input--small .el-input__inner {
    height: 32px;
    line-height: 32px;
}
.el-input--mini .el-input__inner {
    height: 28px;
    line-height: 28px;
}

