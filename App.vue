<script>
	import heracles from 'heracles'
	export default {
		onLaunch: function(option) {
			console.log('App Launch')
			heracles.startAppEventDispatch(option)
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import '/static/qweather-icons/font/qweather-icons.css';
</style>