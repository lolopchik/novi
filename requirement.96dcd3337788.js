window.CKEDITOR_BASEPATH = '/static/ckeditor/ckeditor/';

{
    var requirejs_paths = {
        'jquery': 'requirejs/fake_jquery',
        'moment': 'requirejs/fake_moment',
        'dropzone': 'js/dropzone'
    };

    var timestamp = $('#requirement').attr('timestamp');

    function add_script(path){
        requirejs_paths[path] = path
    }
    add_script('mshp/studies/diary2');
    add_script('mshp/libs/views_helpers/spyable');
    add_script('mshp/libs/ajax/vue_adapter');
    add_script('jquery/plugins/jQRangeSlider-5.7.0/jQDateRangeSlider-withRuler-min');
    add_script('jquery/plugins/jQRangeSlider-5.7.0/range_date_slider');
    add_script('mshp/libs/iterator');
    add_script('ckeditor/ckeditor/adapters/jquery');
    add_script('ckeditor/ckeditor/ckeditor');
    add_script('mshp/libs/widgets/ace_widget');
    add_script('jquery/plugins');
    add_script('jquery/ui-bootstrap');
    add_script('moment/jstz');
    add_script('moment/jstz.min');
    add_script('moment/moment.min');
    add_script('moment/send_timezone');
    add_script('jquery/plugins/readmore/readmore');
    add_script('jquery/plugins/readmore/preparer');
    add_script('jquery/plugins/jquery.matchHeight');
    add_script('achievement/es5-shims.min');
    add_script('achievement/share');
    add_script('jquery/plugins/croppie');
    add_script('jquery/plugins/croppie_adapter');
    add_script('jquery/ui-bootstrap/jquery-ui.min');
    add_script('dadata/init');

    require.config({
      paths: {
        mathjax: "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-AMS-MML_HTMLorMML&amp;delayStartupUntil=configured"
      },

      shim: {
        mathjax: {
          exports: "MathJax",
        }
      }
    });

    require.config({
        baseUrl: window.location.protocol + "//" + window.location.host
            + window.location.pathname.split("/").slice(0, -1).join("/"),

        paths: {
            'text': 'requirejs/plugins/text',
            'async': 'requirejs/plugins/async',
            'goog': 'requirejs/plugins/goog',
            'propertyParser': 'requirejs/plugins/propertyParser',
            'ace/ace': "/static/django_ace/ace/ace",
        }
    });
    var flot_deps = {
        deps: [
           'flot/jquery.flot'
        ]
    };

    require.config({
        baseUrl: '/static/bundles',
        waitSeconds: 30,
        urlArgs: 'bust=' + timestamp,
    });

    require.config({
        baseUrl: '/static',
        paths: requirejs_paths,
        urlArgs: 'bust=' + timestamp,
        shim: {
            'mshp/studies/diary2': {
                exports: 'Diary',
                deps: [
                    'mshp/libs/views_helpers/spyable',
                    'jquery/plugins/jQRangeSlider-5.7.0/range_date_slider'
                ]
            },
            'jquery/plugins/jQRangeSlider-5.7.0/range_date_slider': {
                exports: 'DateSlider',
                deps: [
                    // 'jquery/plugins/jQRangeSlider-5.7.0/jQDateRangeSlider-withRuler-min',
                    'mshp/libs/iterator'
                ]
            },
            'ckeditor/ckeditor/adapters/jquery': {
                exports: 'ckeditor_widget',
                deps: [
                ]
            },
            'flot/jquery.flot.tooltip': flot_deps,
            'flot/jquery.flot.dashes': flot_deps,
            'flot/jquery.flot.crosshair': flot_deps,
            'flot/jquery.flot.symbol': flot_deps,

            'mshp/teaching_materials/contests/runs_update': {
                deps: [
                    'mshp/libs/views/list_view/field_list_view'
                ]
            },
            'mshp/personal_data/pupils/course_tracks': {
                deps: [
                    'jquery/plugins/jquery.jsPlumb-1.5.5'
                ]
            },
            'mshp/libs/views/tree_view/help_tree': {
                deps: [
                    'django_mptt_admin/js/tree.jquery'
                ]
            },
            'jquery': {
                exports: "$"
            },
            'moment': {
                exports: "moment"
            },
            'no-data-to-display': {
                deps: [
                    'highcharts'
                ]
            },
            'highcharts/export-csv': {
                deps: [
                    'highcharts'
                ]
            },
            'moment/send_timezone': {
                deps: [
                    'moment/jstz.min'
                ]
            },
            'mshp/libs/views/tree_view/mptt': {
                deps: [
                    'django_mptt_admin/js/tree.jquery'
                ]
            },
            'mshp/libs/views/tree_view/editable': {
                deps: [
                    'django_mptt_admin/js/tree.jquery',
                    'mshp/libs/views/tree_view/mptt'
                ]
            },
            'mshp/docs/doctools': {
                deps: [
                    'mshp/docs/underscore'
                ]
            },
            'mshp/docs/translations': {
                deps: [
                    'mshp/docs/doctools'
                ]
            },
            'mshp/docs/searchtools': {
                deps: [
                    'mshp/docs/doctools'
                ]
            },
            'mshp/clients/webinars/navigate_pupils': {
                deps: [
                    'mshp/libs/websocket'
                ]
            },
            'mshp/clients/navigate_pupils': {
                deps: [
                    'mshp/libs/websocket'
                ]
            },
            'dadata/init': {
                deps: [
                    'dadata/jquery.suggestions.min'
                ]
            },
        }
    });
}