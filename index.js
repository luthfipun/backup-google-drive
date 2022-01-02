import Bree from 'bree';

(() => {

    const bree = new Bree({
        jobs: [
            {
                name: 'worker-backup-mysql',
                interval: '6 hours'
            }
        ]
    });

    bree.start();

})();