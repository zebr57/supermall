<template>
	<div class="account">
		<div class="account-item">
		  <div class="number">
		    <span class="balance">0.00</span>元
		  </div>
		  <div class="account-info">我的余额</div>
		</div>
		<div class="account-item">
		  <div class="number">
		    <span class="balance">0.00</span>元
		  </div>
		  <div class="account-info">我的余额</div>
		</div>
		<div class="account-item">
		  <div class="number">
		    <span class="balance">0.00</span>元
		  </div>
		  <div class="account-info">我的余额</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "AccountInfo"
	}
</script>

<style scoped>
	
	.account {
		display: flex;
	}
	
	.account-item {
		width: 100%;
		background-color: #FFFFFF;
		margin-right: 1px;
		padding: 18px;
		color: #666;
		font-size: 13px;
		text-align: center;
	}
	
	.account-info {
		margin-top: 6px;
	}
	
	.account-item .balance {
	  font-size: 24px;
	  font-weight: 700;
	  color: #ff5f3e;
	}
</style>
