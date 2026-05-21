 const seatConfig = {
            price: 45.00,
            rows: {
                'B': [1, 2, 3, 4, 5, 6, 7, 'GAP', 8, 7, 6, 5, 4, 3, 2, 1],
                'C': [1, 2, 3, 4, 5, 6, 7, 8, 'GAP', 8, 7, 6, 5, 4, 3, 2, 1],
                'D': [1, 2, 3, 4, 5, 6, 7, 8, 'GAP', 9, 8, 7, 6, 5, 4, 3, 2, 1],
                'E': [10, 9, 'AC', 'WHEELCHAIR', 'GAP', 'AC', 'AC', 'WHEELCHAIR', 'GAP', 'AC'],
                'F': [1, 2, 3, 4, 5, 6, 7, 8, 'GAP', 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
                'G': [1, 2, 3, 4, 5, 6, 7, 8, 'GAP', 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
                'H': [1, 2, 3, 4, 5, 6, 7, 8, 'GAP', 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
                'I': [1, 2, 3, 4, 5, 6, 7, 8, 'GAP', 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
                'J': [1, 2, 3, 4, 5, 6, 7, 8, 'GAP', 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
                'K': [1, 2, 3, 4, 5, 6, 7, 8, 'GAP', 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
                'L': [1, 2, 3, 4, 5, 6, 7, 8, 'GAP', 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
                'M': [1, 2, 3, 4, 5, 6, 7, 8, 'GAP', 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
            },
            occupied: ['C-7', 'C-8', 'G-15', 'G-14', 'G-13', 'H-15', 'H-14', 'H-13', 'I-15', 'I-14', 'I-13', 'J-15', 'J-14', 'J-13', 'I-1', 'J-1', 'I-2', 'J-2'],
            selected: new Set()
        };
 
        let zoomLevel = 1;
 
        function generateSeats() {
            const container = document.getElementById('seatsContainer');
            container.innerHTML = '';
 
            Object.entries(seatConfig.rows).forEach(([row, seats]) => {
                const rowDiv = document.createElement('div');
                rowDiv.className = 'row';
 
                const label = document.createElement('div');
                label.className = 'row-label';
                label.textContent = row;
                rowDiv.appendChild(label);
 
                const seatsDiv = document.createElement('div');
                seatsDiv.className = 'row-seats';
 
                seats.forEach((seat, index) => {
                    if (seat === 'GAP') {
                        const gap = document.createElement('div');
                        gap.className = 'seat gap-medium';
                        gap.style.pointerEvents = 'none';
                        seatsDiv.appendChild(gap);
                    } else if (seat === 'AC') {
                        const ac = document.createElement('div');
                        ac.className = 'accessibility-badge';
                        ac.textContent = 'AC';
                        seatsDiv.appendChild(ac);
                    } else if (seat === 'WHEELCHAIR') {
                        const wh = document.createElement('div');
                        wh.className = 'accessibility-badge wheelchair';
                        wh.textContent = '♿';
                        seatsDiv.appendChild(wh);
                    } else {
                        const seatDiv = document.createElement('button');
                        const seatId = `${row}-${seat}`;
                        seatDiv.className = 'seat';
                        seatDiv.textContent = seat;
                        seatDiv.dataset.seatId = seatId;
 
                        if (seatConfig.occupied.includes(seatId)) {
                            seatDiv.classList.add('occupied');
                            seatDiv.disabled = true;
                        }
 
                        if (seatConfig.selected.has(seatId)) {
                            seatDiv.classList.add('selected');
                        }
 
                        seatDiv.addEventListener('click', () => toggleSeat(seatDiv, seatId));
                        seatsDiv.appendChild(seatDiv);
                    }
                });
 
                rowDiv.appendChild(seatsDiv);
                container.appendChild(rowDiv);
            });
 
            updateInfo();
        }
 
        function toggleSeat(element, seatId) {
            if (element.classList.contains('occupied')) return;
 
            if (seatConfig.selected.has(seatId)) {
                seatConfig.selected.delete(seatId);
                element.classList.remove('selected');
            } else {
                seatConfig.selected.add(seatId);
                element.classList.add('selected');
            }
 
            updateInfo();
        }
 
        function updateInfo() {
            const count = seatConfig.selected.size;
            const total = count * seatConfig.price;
 
            document.getElementById('selectedCount').textContent = count;
            document.getElementById('totalPrice').textContent = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            document.getElementById('continueBtn').disabled = count === 0;
        }
 
        function clearSelection() {
            seatConfig.selected.clear();
            document.querySelectorAll('.seat.selected').forEach(seat => {
                seat.classList.remove('selected');
            });
            updateInfo();
        }
 
        function continueSelection() {
            const seats = Array.from(seatConfig.selected).sort().join(', ');
            alert(`Assentos selecionados: ${seats}\nTotal: R$ ${(seatConfig.selected.size * seatConfig.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`);
        }
 
        function zoomIn() {
            zoomLevel += 0.1;
            applyZoom();
        }
 
        function zoomOut() {
            if (zoomLevel > 0.6) {
                zoomLevel -= 0.1;
                applyZoom();
            }
        }
 
        function applyZoom() {
            const container = document.querySelector('.rows-section');
            container.style.transform = `scale(${zoomLevel})`;
            container.style.transformOrigin = 'top center';
        }
 
        // Initialize
        generateSeats();