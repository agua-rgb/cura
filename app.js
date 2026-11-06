document.addEventListener('DOMContentLoaded', () => {
    let lastCount = 0;

    function fetchState() {
        fetch('/api/citizens')
            .then(res => res.json())
            .then(data => {
                if (data.length !== lastCount) {
                    lastCount = data.length;
                    
                    const container = document.getElementById('verified-items');
                    container.innerHTML = '';

                    if (data.length === 0) {
                        container.innerHTML = '<p class="empty-msg">No citizens verified yet.</p>';
                    } else {
                        data.forEach(item => {
                            const div = document.createElement('div');
                            div.className = 'verified-record';
                            div.innerHTML = `
                                <strong>${item.first_name} ${item.last_name}</strong>
                                <span>CURP: ${item.curp}</span><br>
                                <span>RFC: ${item.rfc}</span><br>
                                <span>NSS: ${item.nss}</span><br>
                                <span>Address: ${item.address}</span><br>
                                <span>Phone: ${item.phone}</span><br>
                                <span>Email: ${item.email}</span>
                            `;
                            container.appendChild(div);
                        });
                    }
                }
            })
            .catch(err => console.log(err));
    }

    fetchState();
    setInterval(fetchState, 2000);
});
