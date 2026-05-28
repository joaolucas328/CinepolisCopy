const seatConfig = {
    price: 45.00,
    rows: {
        'B': [1, 2, 3, 4, 5, 6, 'GAP', 9, 10, 11, 12, 13, 14,],
        'C': [1, 2, 3, 4, 5, 6, 7, 'GAP', 9, 10, 11, 12, 13, 14, 15,],
        'D': [1, 2, 3, 4, 5, 6, 7, 8, 'GAP', 9, 10, 11, 12, 13, 14, 15, 16],
        'E': ['AC', 'WHEELCHAIR', 'AC', 'WHEELCHAIR', 'GAP', 'AC', 'WHEELCHAIR', 'AC', 'WHEELCHAIR'],
        'F': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'GAP', 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        'G': ['AC', 'WHEELCHAIR', 'AC', 'WHEELCHAIR', 'GAP', 'AC', 'WHEELCHAIR', 'AC', 'WHEELCHAIR'],
        'H': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'GAP', 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        'I': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'GAP', 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        'J': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'GAP', 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        'K': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'GAP', 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        'L': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'GAP', 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        'M': [1, 2, 3, 4, 5, 6, 7, 8, , 'GAP', 9, 10, 11, 12, 13, 14, 15,16,]
    },
    occupied: [],
    selected: new Set()
};
9, 10, 11, 12, 13, 14, 15, 16
9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
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

        seats.forEach((seat) => {
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