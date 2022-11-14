<template>
	<view>
		<!-- 使用自定义的搜索组件 -->
		<my-search @click="gotoSearch"></my-search>
		<view class="scroll-view-container">
			<!-- 左侧的滚动视图区域 -->
			<scroll-view class="left-scroll-view" scroll-y :style="{height: wh + 'px'}">
				<view v-for="(item, index)  in cateList" @click="activeChanged(index)" :key="index"
					class="left-scroll-view-item " :class="{active:index === active}">
					{{item.cat_name}}
				</view>

			</scroll-view>
			<!-- 右侧的滚动视图区域 -->
			<scroll-view class="right-scroll-view" :scroll-top="scrollTop" scroll-y :style="{height: wh + 'px'}">
				<view v-for="(item2, i2) in cateLevel2" :key="i2" class="cate-lv2">
					<view class="cate-lv2-title">
						/ {{item2.cat_name}} /
					</view>
					<!-- 动态渲染三级分类的列表数据 -->
					<view class="cate-lv3-list">
						<!-- 三级分类 Item 项 -->
						<view @click="gotoGoodsList(item3)" class="cate-lv3-item" v-for="(item3, i3) in item2.children"
							:key="i3">
							<!-- 图片 -->
							<image :src="item3.cat_icon"></image>
							<!-- 文本 -->
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	export default {
		mixins:[badgeMix],
		data() {
			return {
				// 窗口的可用高度 = 屏幕高度 - navigationBar高度 - tabBar 高度
				wh: 0,
				// 分类数据列表
				cateList: [],
				// 当前选中项的索引，默认让第一项被选中
				active: 0,
				// 二级分类列表
				cateLevel2: [],
				// 滚动条距离顶部的距离
				scrollTop: 0
			};
		},
		onLoad() {
			// 获取当前系统的信息
			const sysInfo = uni.getSystemInfoSync()
			// 可用高度 = 屏幕高度 - navigationBar高度 - tabBar高度 - 自定义的search组件高度
			this.wh = sysInfo.windowHeight - 50
			// 调用获取分类列表数据的方法
			this.getCateList()

		},
		methods: {
			async getCateList() {
				// 发起请求
				const res = await this.$http.getCateList()
				if (res.meta.status !== 200) return uni.showMsg()
				this.cateList = res.message
				// 为二级分类赋值
				this.cateLevel2 = res.message[0].children
			},
			activeChanged(i) {
				this.active = i
				// 为二级分类列表重新赋值
				this.cateLevel2 = this.cateList[i].children
			},
			// 点击三级分类项跳转到商品列表页面
			gotoGoodsList(item3) {
				uni.navigateTo({
					url: '/subpkg/good_list/good_list?cid=' + item3.cat_id
				})
			},
			// 跳转到分包中的搜索页面
			gotoSearch() {
				console.log(1);
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.scroll-view-container {
		display: flex;

		.left-scroll-view {
			width: 120px;

			.left-scroll-view-item {
				position: relative;
				background-color: #F7F7F7;
				line-height: 60px;
				text-align: center;
				font-size: 12px;

				&.active {
					background-color: #fff;

					&::after {
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
						content: "";
						display: inline-block;
						width: 3px;
						height: 30px;
						background-color: #c00;
					}
				}
			}
		}

		.right-scroll-view {
			flex: 1;

			.cate-lv2-title {
				font-size: 12px;
				font-weight: bold;
				text-align: center;
				padding: 15px 0;

			}

			.cate-lv3-list {
				display: flex;
				flex-wrap: wrap;

				.cate-lv3-item {
					width: 33.33%;
					margin-bottom: 10px;
					display: flex;
					flex-direction: column;
					align-items: center;

					image {
						width: 60px;
						height: 60px;
					}

					text {
						font-size: 12px;
					}
				}
			}
		}
	}
</style>
