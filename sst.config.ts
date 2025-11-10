/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'cicd',
      removal: 'remove',
      protect: false,
      home: 'aws',
      providers: {
        aws: {
          profile: 'cicd',
          region: 'us-east-1',
        },
      },
    }
  },
  async run() {
    const vpc = new sst.aws.Vpc('Vpc', {
      nat: 'ec2',
      bastion: true,
    })
    const cluster = new sst.aws.Cluster('Cluster', {
      vpc,
    })
    new sst.aws.Service('Server', {
      cluster,
      loadBalancer: {
        ports: [{ listen: '80/http', forward: '3000/http' }],
      },
      dev: {
        command: 'bun dev',
      },
    })
  },
})
