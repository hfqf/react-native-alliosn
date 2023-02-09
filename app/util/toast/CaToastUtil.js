
import Toast from 'react-native-root-toast';


var showToast = function (msg) {

     Toast.hide(global.toast);
    global.toast = Toast.show(msg, {
        duration:  Toast.durations.LONG,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 3,
        onShow: () => {
            // calls on toast\`s appear animation start
        },
        onShown: () => {

            // calls on toast\`s appear animation end.
        },
        onHide: () => {
            // calls on toast\`s hide animation start.
        },
        onHidden: () => {
            // calls on toast\`s hide animation end.
        }
    });

       setTimeout(function(){
           Toast.hide(global.toast);
       },3000);

}

module.exports = showToast;