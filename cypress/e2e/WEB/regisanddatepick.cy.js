/// <reference types="cypress" />

describe('Automasi Website Demo: Registration & Date Picker', () => {
    const demoUrl = 'https://testautomationpractice.blogspot.com/';

    beforeEach(() => {
        cy.visit(demoUrl);
        // to ensure the correct page and detail
        cy.url().should('include', 'blogspot.com');
        cy.title().should('include', 'Automation Testing Practice');
        cy.log('Berhasil memuat halaman demo.');
    });

    it('Submit the registration with a dummy profile and select the date from the date picker', () => {
        cy.log('--- Memulai Langkah 1: Mengisi Formulir Pendaftaran ---');

        cy.get('#name').type('michael jackson');
        cy.get('#email').type('michael.jackson@example.com');
        cy.get('#phone').type('081210102929');

        cy.get('input[name="gender"][value="male"]').check();
        cy.get('#textarea').type('Komplek Merdeka No. 15, Jakarta Pusat');

        cy.get('input[id="sunday"][value="sunday"]').check();

        cy.get('#country').select('United States');
        cy.get('#colors').select('Red');
        cy.get('#animals').select('cat');


        cy.log('--- Memulai Langkah 2: Interaksi dengan Date Picker ---');
        cy.get('#datepicker').type('07/18/2025{enter}')

        const targetDay = 25;
        const targetMonthIndex = 6;
        const targetYear = 2025;

        const monthNames = ["January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"];

        // navigate to month and year
        function navigateToDate() {
            return cy.get('.ui-datepicker-title').then(($title) => {
                const currentMonthYearText = $title.text();
                const [currentMonthName, currentYearStr] = currentMonthYearText.split(' ');
                const currentMonthIdx = monthNames.indexOf(currentMonthName);
                const currentYear = parseInt(currentYearStr);

                if (currentYear < targetYear || (currentYear === targetYear && currentMonthIdx < targetMonthIndex)) {
                    cy.get('.ui-datepicker-next').click();
                    return navigateToDate(); 
                } else if (currentYear > targetYear || (currentYear === targetYear && currentMonthIdx > targetMonthIndex)) {
                    cy.get('.ui-datepicker-prev').click();
                    return navigateToDate(); 
                } else {
                    
                    cy.log(`Berada di bulan dan tahun target: ${currentMonthName} ${currentYear}`);
                    return;
                }
            });
        }

        // Jalankan fungsi navigasi
        navigateToDate();

    
        cy.get(`.ui-datepicker-calendar td:not(.ui-datepicker-other-month) a`).contains(targetDay).click();

        const expectedMonth = (targetMonthIndex + 1).toString().padStart(2, '0'); // Ubah kembali ke 1-indexed dan format 2 digit
        const expectedDay = targetDay.toString().padStart(2, '0'); // Format 2 digit
        const expectedDate = `${expectedMonth}/${expectedDay}/${targetYear}`;

        cy.get('#datepicker').should('have.value', expectedDate);
        cy.log(`Tanggal ${expectedDate} berhasil dipilih.`);

        cy.log('--- Berhasil Menyelesaikan Langkah 2 ---');

        cy.log('Semua langkah otomatisasi telah selesai dengan sukses!');


        it('Harus bisa mengunggah gambar (Skenario Terpisah: Membutuhkan elemen input[type="file"])', () => {
            cy.visit(demoUrl);
        
            // Asumsi ada input file di halaman dengan ID atau selector tertentu
            // Ganti '#uploadfile' jika berbeda
            const fileName ='cihuahua.jpeg'; // nama file yang disimpan di fixtures
        
            cy.get('input[type="file"]').attachFile(fileName);
        
            // Tambahkan verifikasi bila ada tampilan pratinjau gambar, alert, atau lainnya
            cy.log('Single file selected: cihuahua.jpeg, Size: 16292 bytes, Type: image/jpeg');
        });
    });
        
  });