define('TSelectCtrl', function(require, exports, module){
    var $ = jQuery;
    var Base = require('base');
    var TSelectCtrl = Base.extend({
        initialize: function(config) {
            TSelectCtrl.superclass.initialize.call(this, config);
			this.$config = config;
            this.id = config.id;
            this.low_id = config.id.toLowerCase();
            this.required = config.required;
            this.desc = config.desc;
			this.$selobj = $('[name^="DATA_"][title=' + config.title +']').eq(0);
			this.$selobj_nodeName = this.$selobj[0].nodeName;
			this.$options_arr = new Array();
            this.$child = $('[name^="DATA_"][title=' + config.child +']').eq(0);
			if(this.$child.length != 0){
				this.$child_nodeName =  this.$child[0].nodeName;
				this.$child_options_arr = this.$child.find("option");
			}
            this.bindEvent();
        },
        bindEvent: function() {
			var self = this;
            var select_arr = window.select_arr || [];
			if($.inArray(self.$config.child, select_arr) != -1){ //根据子元素判定是关联的SELECT控件
				if(self.$selobj_nodeName.toUpperCase() == "SELECT"){//不保密的情况
					if(self.$selobj.hasClass('BigStatic1')){ //不可写情况下
						if(self.$config.value != ''){//有值的情况即办理或有默认值的情况
							var val_arr = self.$selobj.find('option[value="'+self.$config.value+'"]').val().split("|");
							self.$selobj.find('option[value="'+self.$config.value+'"]').text(val_arr[0]);
							self.$selobj.find('option[value!="'+self.$config.value+'"]').remove();
							if(self.$child.length != 0){//关联的子菜单存在
								if(self.$child_nodeName.toUpperCase() == "SELECT"){//子元素为不保密字段
									var parent_val = '|'+self.$selobj.val();
									self.$child.find('option').remove();
									self.$child_options_arr.each(function(i, n){
										if($(n).val().indexOf(parent_val) != -1){
											var val_arr = $(n).val().split("|");
											self.$child.append("<option value='"+$(n).val()+"'>"+val_arr[0]+"</option>");
										}
									});
									self.$child.trigger('change');
								}
							}
						}else{//无值的情况即新建且没默认值的情况
							self.$selobj.find('option').remove();
							if(self.$child.length != 0){//关联的子菜单存在
								if(self.$child_nodeName.toUpperCase() == "SELECT" && !self.$child.hasClass('BigStatic1')){//子元素为不保密字段
									self.$child.find('option').remove();
									self.$child_options_arr.each(function(i, n){
										var val_arr = $(n).val().split("|");
										self.$child.append("<option value='"+$(n).val()+"'>"+val_arr[0]+"</option>");
									});
									self.$child.trigger('change');
								}
							}
						}
					}else{//可写情况
						if(self.$child.length != 0){//关联的子菜单存在 
							if(self.$child_nodeName.toUpperCase() == "SELECT" && !self.$child.hasClass('BigStatic1')){//子元素为不保密字段
								self.$selobj.change(function(){
                                    if(self.$selobj.val() == "")
                                    {
                                        self.$child.find('option').remove();
                                    }
                                    else
                                    {
                                        var parent_val = '|'+self.$selobj.val();
                                        self.$child.find('option').remove();
                                        self.$child_options_arr.each(function(i, n){
                                            if($(n).val().indexOf(parent_val) != -1){
                                                var val_arr = $(n).val().split("|");
                                                self.$child.append("<option value='"+$(n).val()+"'>"+val_arr[0]+"</option>");
                                            }
                                        });
                                    }
									self.$child.trigger('change');
								});
							}
						}
						if(this.$config.value != ''){
							this.$selobj.val(this.$config.value);
						}
						self.$selobj.trigger('change');
					}
				}else if(self.$selobj_nodeName.toUpperCase() == "INPUT"){//保密的情况
					if(self.$child.length != 0){//关联的子菜单存在 
						if(self.$child_nodeName.toUpperCase() == "SELECT" && !self.$child.hasClass('BigStatic1')){//子元素为不保密字段
							self.$selobj.change(function(){
								var parent_val = '|'+self.$selobj.val();
								self.$child.find('option').remove();
								self.$child_options_arr.each(function(i, n){
									if($(n).val().indexOf(parent_val) != -1){
										var val_arr = $(n).val().split("|");
										self.$child.append("<option value='"+$(n).val()+"'>"+val_arr[0]+"</option>");
									}
								});
								self.$child.trigger('change');
							});
						}
					}
					self.$selobj.trigger('change');
				}
			}else{//普通的SELECT控件
				if(self.$selobj.hasClass('BigStatic1')){ //不可写情况下
					if(self.$config.value != ''){
						self.$selobj.find('option[value!="'+self.$config.value+'"]').remove();
					}else{
						self.$selobj.find('option').remove();
					}
				}else{//可写情况
					if(self.$config.value != ''){
						self.$selobj.val(self.$config.value);
					}
				}
			}
			if(!self.$selobj.hasClass('BigStatic1')){
				if(self.$selobj_nodeName.toUpperCase() == "SELECT"){//控件的双击事件会弹出历史选择信息
					self.$selobj.dblclick(function(){
						quick_load(this, self.$config.run_id, self.$config.flow_id);
					});
				}
			}
        },

        onSubmit: function(){
            var obj_val = this.$selobj.val(),
                required_val = this.required,
                low_id = this.low_id;
            if((obj_val === '' || obj_val === false || typeof obj_val == 'undefined') && required_val)
            {
                this.validation(this.desc);
                setTimeout(function(){
                    jQuery("#div_alert_"+low_id+"").removeClass("div_alert_show");
                }, 5000);
                return false;
            }
        },

        validation: function(desc){
            jQuery("#div_alert_"+this.low_id+"").addClass("div_alert_show");
        }

    });
    exports.TSelectCtrl = window.TSelectCtrl = TSelectCtrl;
});