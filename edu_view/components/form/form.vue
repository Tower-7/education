<template>
	<view>
		<form method="post" action="http://upload.qiniup.com/"
		 enctype="multipart/form-data">
		  <input name="key" type="hidden" value="<resource_key>">
		  <input name="x:<custom_name>" type="hidden" value="<custom_value>">
		  <input name="token" type="hidden" value="<upload_token>">
		  <input name="crc32" type="hidden" />
		  <input name="accept" type="hidden" />
		  <input name="file" type="file" />
		  <input type="submit" value="上传文件" />
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
