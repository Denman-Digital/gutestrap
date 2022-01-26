(function () {
	'use strict';

	window.gutestrap = window.gutestrap || {};
	jQuery(function ($) {
	  var _window = window,
	      gutestrap = _window.gutestrap;

	  function initializeCodemirror() {
	    var customScssMetabox = $("#gutestrap_custom_scss_metabox");

	    if (!customScssMetabox.length) {
	      return false;
	    }

	    gutestrap.customScssEditor = wp.codeEditor.initialize(customScssMetabox, gutestrapCodeMirrorSettings);
	    gutestrap.customScssEditor.codemirror.on("blur", function () {
	      gutestrap.customScssEditor.codemirror.save();
	    });
	    setTimeout(function () {
	      gutestrap.customScssEditor.codemirror.refresh();
	    }, 1);
	  }

	  if (!initializeCodemirror()) {
	    $(document).on("gutestrap_custom_scss_metabox", initializeCodemirror);
	  }
	});

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3NpYy5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL2NsYXNzaWMuanMiXSwic291cmNlc0NvbnRlbnQiOm51bGwsIm5hbWVzIjpbIndpbmRvdyIsImd1dGVzdHJhcCIsImpRdWVyeSIsIiQiLCJpbml0aWFsaXplQ29kZW1pcnJvciIsImN1c3RvbVNjc3NNZXRhYm94IiwibGVuZ3RoIiwiY3VzdG9tU2Nzc0VkaXRvciIsIndwIiwiY29kZUVkaXRvciIsImluaXRpYWxpemUiLCJndXRlc3RyYXBDb2RlTWlycm9yU2V0dGluZ3MiLCJjb2RlbWlycm9yIiwib24iLCJzYXZlIiwic2V0VGltZW91dCIsInJlZnJlc2giLCJkb2N1bWVudCJdLCJtYXBwaW5ncyI6Ijs7O0NBQUFBLE1BQU0sQ0FBQ0MsU0FBUCxHQUFtQkQsTUFBTSxDQUFDQyxTQUFQLElBQW9CLEVBQXZDO0NBQ0FDLE1BQU0sQ0FBQyxVQUFVQyxDQUFWLEVBQWE7Q0FDbkIsZ0JBQXNCSCxNQUF0QjtDQUFBLE1BQVFDLFNBQVIsV0FBUUEsU0FBUjs7Q0FFQSxXQUFTRyxvQkFBVCxHQUFnQztDQUMvQixRQUFNQyxpQkFBaUIsR0FBR0YsQ0FBQyxDQUFDLGdDQUFELENBQTNCOztDQUNBLFFBQUksQ0FBQ0UsaUJBQWlCLENBQUNDLE1BQXZCLEVBQStCO0NBQzlCLGFBQU8sS0FBUDtDQUNBOztDQUNETCxJQUFBQSxTQUFTLENBQUNNLGdCQUFWLEdBQTZCQyxFQUFFLENBQUNDLFVBQUgsQ0FBY0MsVUFBZCxDQUF5QkwsaUJBQXpCLEVBQTRDTSwyQkFBNUMsQ0FBN0I7Q0FDQVYsSUFBQUEsU0FBUyxDQUFDTSxnQkFBVixDQUEyQkssVUFBM0IsQ0FBc0NDLEVBQXRDLENBQXlDLE1BQXpDLEVBQWlELFlBQU07Q0FDdERaLE1BQUFBLFNBQVMsQ0FBQ00sZ0JBQVYsQ0FBMkJLLFVBQTNCLENBQXNDRSxJQUF0QztDQUNBLEtBRkQ7Q0FHQUMsSUFBQUEsVUFBVSxDQUFDLFlBQVk7Q0FDdEJkLE1BQUFBLFNBQVMsQ0FBQ00sZ0JBQVYsQ0FBMkJLLFVBQTNCLENBQXNDSSxPQUF0QztDQUNBLEtBRlMsRUFFUCxDQUZPLENBQVY7Q0FHQTs7Q0FDRCxNQUFJLENBQUNaLG9CQUFvQixFQUF6QixFQUE2QjtDQUM1QkQsSUFBQUEsQ0FBQyxDQUFDYyxRQUFELENBQUQsQ0FBWUosRUFBWixDQUFlLCtCQUFmLEVBQWdEVCxvQkFBaEQ7Q0FDQTtDQUNELENBbkJLLENBQU47Ozs7OzsifQ==
