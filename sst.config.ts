/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app() {
		return {
			home: 'aws',
			name: 'cicd',
			protect: false,
			providers: {
				aws: {
					profile: 'cicd',
					region: 'us-east-1',
				},
			},
			removal: 'remove',
		}
	},
	async run() {
		const vpc = new sst.aws.Vpc('Vpc', {
			bastion: true,
			nat: 'ec2',
		})
		const cluster = new sst.aws.Cluster('Cluster', {
			vpc,
		})
		new sst.aws.Service('Server', {
			cluster,
			dev: {
				command: 'bun dev',
			},
			loadBalancer: {
				ports: [{ forward: '3000/http', listen: '80/http' }],
			},
		})
	},
})
