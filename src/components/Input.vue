<template>
	<div>
		<v-text-field 
			v-if="type === 'text' || type === 'number'"
			:type="type"
			v-bind:value="value"
			v-on:input="$emit('input', $event)"
			outlined 
			dense 
			:prepend-icon="icon"
			:label="label"
			:error-messages="errorMsg"
			:error="Boolean(hasError)"
			:disabled="disabled"
			:color="color"
			required>
		</v-text-field>
		<v-card v-if="type === 'file-image'" style="height:400px;border-radius:10px" >

			<v-img v-if="fileurl && !imageUrl" :src="fileurl" :height="340"></v-img>
			<v-img v-if="imageUrl && !fileurl" :src="imageUrl" :height="340"></v-img>

			<v-card-title v-if="fileurl && !imageUrl">
				<small>Arquivo selecionado: <v-chip small>{{value.name}}</v-chip></small>
				<v-spacer></v-spacer>
				<v-btn icon @click="onFileChange(null)"> <v-icon>fa-times</v-icon> </v-btn>
			</v-card-title>

			
			<v-card-title v-if="imageUrl && !fileurl">
				<small>Arquivo: <v-chip small>{{imageUrl}}</v-chip></small>
				<v-spacer></v-spacer>
				<v-btn icon @click="onFileChange(null)"> <v-icon>fa-times</v-icon> </v-btn>
			</v-card-title>


			<div v-if="!fileurl && !imageUrl" style="width:100%;height:400px" >
				<v-container
					class="fill-height ma-0 pa-0 "
					style="width:100%"
					fluid
				>
					<v-row
						align="center"
						justify="center"
						style="width:100%"
						no-gutters
					>
						<v-col
							cols="12"
						>
						<v-btn text @click="openFileInput()" style="width:100%;height:400px">
							<v-icon :size="80" class="mr-2">{{icon}}</v-icon>
							{{label}}
						</v-btn>
							
						</v-col>
					</v-row>
				</v-container>
			</div>
			<v-card-actions class="pa-5">
				<input type="file"  hidden ref="fileInput" @change="onFileChange($event)"/>
				<v-alert v-if="Boolean(hasError)" class="error" dense >{{errorMsg}}</v-alert>
			</v-card-actions>
			
		</v-card>
		
		<div v-if="type === 'separator'"> 
			<v-divider />
		</div>

		<v-btn
		class="fill-height"
			v-if="type === 'btn'"
			outlined
			:disabled="disabled"
			text
			:color="color"
			@click="onBtnClick()"
		> <v-icon>{{icon}}</v-icon> {{label}}</v-btn>

		
	</div>
</template>
<script>
export default {
	props:{
		value: [String, Number],
		type: String,
		errorMsg: String,
		hasError: String,
		disabled: Boolean,
		icon: String,
		onBtnClick: Function,
		color: String,
		label: String,
		imageUrl: String,
		onClearImage: Function
	},
	data(){
		return {
			fileurl: null
		}
	},
	methods:{
		openFileInput(){
			this.$refs.fileInput.click()
		},
    onFileChange(e) {
			if(e){
				this.$emit('input', e.target.files[0])
				this.fileurl = URL.createObjectURL(e.target.files[0]);
			}else{
				this.$emit('input', null)
				this.fileurl = null
				//this.onClearImage()
			}
    }
	}
    
}
</script>