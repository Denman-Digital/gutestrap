!function(){"use strict";window.gutestrap=window.gutestrap||{},jQuery((function(t){var o=window.gutestrap;function r(){var r=t("#gutestrap_custom_scss_metabox");if(!r.length)return!1;o.customScssEditor=wp.codeEditor.initialize(r,gutestrapCodeMirrorSettings),o.customScssEditor.codemirror.on("blur",(function(){o.customScssEditor.codemirror.save()})),setTimeout((function(){o.customScssEditor.codemirror.refresh()}),1)}r()||t(document).on("gutestrap_custom_scss_metabox",r)}))}();