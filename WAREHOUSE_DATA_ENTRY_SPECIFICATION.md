# Spesifikasi Input Data Modul Gudang & Inventory

## 📋 Overview
Dokumen ini menjelaskan metode input data untuk setiap fitur di Modul Gudang, termasuk spesifikasi field dan logic reference number sesuai standar farmasi.

---

## 🏭 FITUR-FITUR MODUL GUDANG

### 1. **Stock Inquiry**
**Metode Input:** ❌ **TIDAK ADA INPUT MANUAL**

**Penjelasan:**
- Data stok terbentuk secara **OTOMATIS** dari transaksi modul lain
- Ini adalah fitur **READ-ONLY** untuk melihat status stok real-time
- Data stok di-update otomatis dari:
  - Penerimaan Barang (dari Modul Pembelian)
  - Pengiriman Barang (dari Modul Penjualan)
  - Transfer Antar Cabang (dari Modul Gudang sendiri)
  - Stock Adjustment/Opname (dari Modul Stock Opname)

**Field yang Ditampilkan:**
- SKU / Barcode Produk
- Nama Produk
- Kategori
- Stock Available
- Min/Max Stock Level
- Stock Value
- Status (Normal/Low Stock/Out of Stock/Overstock)
- **Batch Number** (per item)
- **Expired Date** (per batch)

---

### 2. **Transfer Antar Cabang**
**Metode Input:** ✅ **PERLU TOMBOL "CREATE TRANSFER" MANUAL**

**Penjelasan:**
Transfer stok antar cabang adalah keputusan bisnis yang memerlukan input manual oleh user Gudang berdasarkan kebutuhan cabang.

**Form Input - Modal "Create Stock Transfer":**

#### A. Header Information (Required)
```
1. Transfer Number         : [Auto-generated] TR-{FROM}-{TO}-{YYYYMMDD}-{SEQ}
                             Contoh: TR-JKT-BDG-20260102-001
2. Transfer Date           : [Date Picker] - Default: Today
3. From Location *         : [Dropdown] - Pilih cabang asal
4. To Location *           : [Dropdown] - Pilih cabang tujuan
5. Expected Delivery Date  : [Date Picker]
```

#### B. Items to Transfer (Dynamic Lines)
```
Untuk setiap item yang di-transfer:

1. Product / SKU *         : [Search/Select Dropdown]
2. Batch Number *          : [Dropdown] - Pilih batch yang tersedia
3. Expired Date            : [Read-only] - Auto-fill dari batch terpilih
4. Available Qty           : [Read-only] - Qty tersedia di batch tsb
5. Qty to Transfer *       : [Number Input] - Max = Available Qty
6. Unit                    : [Text] - Auto-fill dari master produk
7. Notes                   : [Text Area] - Catatan khusus per item

[Button: + Add Item]
```

#### C. Additional Information
```
8. Shipping Method         : [Dropdown]
                             - Company Vehicle
                             - Third Party Courier
                             - JNE / J&T / SiCepat / dll
9. Driver/Courier Name     : [Text Input]
10. Vehicle Number         : [Text Input] (jika company vehicle)
11. Notes                  : [Text Area] - Catatan umum transfer
```

#### D. Approval & Status
```
12. Created By             : [Auto-fill] - Current User
13. Status                 : [Auto] - PENDING APPROVAL
                             → APPROVED (setelah approval)
                             → IN TRANSIT (setelah dikirim)
                             → RECEIVED (setelah diterima cabang tujuan)
                             → COMPLETED
```

**⚠️ KRITERIA KHUSUS FARMASI:**
- Setiap item transfer WAJIB mencantumkan Batch Number
- Sistem harus validasi bahwa batch yang ditransfer belum expired
- Warning jika transfer batch dengan sisa waktu < 3 bulan sebelum ED
- Penerima harus bisa menerima dengan scan barcode batch

---

### 3. **Stock Movement (Log Pergerakan Stok)**
**Metode Input:** ❌ **TIDAK ADA INPUT MANUAL LANGSUNG**

**Penjelasan:**
Stock Movement adalah **LOG/HISTORY OTOMATIS** yang terbentuk dari setiap transaksi yang mempengaruhi stok. User hanya bisa **MELIHAT** dan **FILTER** data.

**Sumber Data Otomatis:**
Setiap movement record dibuat otomatis saat terjadi transaksi:

| Tipe Movement | Sumber Transaksi | Reference Number |
|---------------|------------------|------------------|
| **STOCK IN** | Good Receipt (dari PO) | GR-{YYYY}-{SEQ} atau PO Number |
| **STOCK IN** | Transfer Received | TR-{FROM}-{TO}-{YYYYMMDD}-{SEQ} |
| **STOCK IN** | Stock Adjustment (Plus) | ADJ-{YYYY}-{SEQ} atau BA Number |
| **STOCK OUT** | Sales Order Delivered | SO-{BRANCH}-{YYYYMMDD}-{SEQ} |
| **STOCK OUT** | Transfer Sent | TR-{FROM}-{TO}-{YYYYMMDD}-{SEQ} |
| **STOCK OUT** | Stock Adjustment (Minus) | ADJ-{YYYY}-{SEQ} atau BA Number |
| **STOCK OUT** | Damaged/Expired Disposal | DSP-{YYYY}-{SEQ} + BA Number |

**Field yang Dicatat (Auto):**
```
1. Timestamp               : [Auto] - YYYY-MM-DD HH:MM:SS
2. Movement Type           : [Auto] - IN / OUT
3. Transaction Type        : [Auto] - Good Receipt / Sales / Transfer / Adjustment / Disposal
4. Reference Number        : [Auto] - Sesuai tabel di atas
5. Product (SKU + Name)    : [Auto]
6. Batch Number *          : [Auto] - WAJIB untuk setiap movement
7. Expired Date *          : [Auto] - WAJIB untuk setiap movement
8. Quantity                : [Auto] - (+) untuk IN, (-) untuk OUT
9. Unit                    : [Auto]
10. Stock Balance After    : [Auto] - Sisa stok setelah transaksi
11. Location/Warehouse     : [Auto]
12. User                   : [Auto] - User yang melakukan transaksi
13. Notes                  : [Auto/Manual] - Catatan transaksi
```

**Filter/Search yang Disediakan:**
- Range tanggal
- Tipe movement (IN/OUT)
- Tipe transaksi
- Produk tertentu
- Batch number
- Reference number
- User

---

### 4. **Generate Barcode**
**Metode Input:** ✅ **PERLU TOMBOL "GENERATE BARCODE" MANUAL**

**Penjelasan:**
User Gudang perlu bisa generate barcode untuk:
- Produk baru yang belum ada barcode
- Print ulang barcode untuk label rusak
- Generate batch-specific barcode (dengan info ED)

**Form Input - "Generate Barcode":**

```
1. Select Branch           : [Dropdown] - Lokasi/cabang
2. Barcode Type            : [Dropdown]
                             - Code 128 (default untuk farmasi)
                             - Code 39
                             - EAN-13
                             - QR Code (dengan embedded batch + ED info)
3. Select Product(s) *     : [Multi-select Search]
4. Batch Number *          : [Dropdown] - Pilih batch spesifik
5. Expired Date            : [Read-only] - Auto-fill dari batch
6. Label Size              : [Dropdown]
                             - Small (50x25mm)
                             - Medium (70x30mm)
                             - Large (100x50mm)
7. Include Information     : [Checkboxes]
                             ☑ Product Name
                             ☑ SKU
                             ☑ Batch Number
                             ☑ Expired Date
                             ☐ Price
                             ☑ Barcode Number
8. Quantity to Print       : [Number Input] - Jumlah label yang akan dicetak
9. Printer                 : [Dropdown] - Pilih printer barcode

[Button: Preview]
[Button: Generate & Print]
```

**⚠️ KRITERIA KHUSUS FARMASI:**
- QR Code harus bisa embed informasi: SKU, Batch, ED, Serial Number (jika ada)
- Label harus jelas menampilkan ED dalam format yang mudah dibaca
- Sistem warning jika generate barcode untuk batch yang sudah expired
- Support untuk serial number individual (untuk produk high-value)

---

## 🔄 LOGIC REFERENCE NUMBER DINAMIS

### Konsep: Field "Reference Number" yang Berubah Berdasarkan Tipe Movement

Ketika user melakukan transaksi yang mempengaruhi stok, field Reference Number harus **dinamis** dan **mandatory** dengan rules berikut:

### **A. Stock IN (Barang Masuk)**

**Kondisi 1: Good Receipt dari Purchase Order**
```
Field: Reference Number
Type: Dropdown (Single Select)
Label: "PO Number *"
Options: List semua PO yang sudah APPROVED namun belum fully received
Format: PO-{YYYY}-{SEQ}
Example: PO-2025-001

Mandatory: YES
Validation:
- PO harus dalam status APPROVED atau PARTIALLY RECEIVED
- Qty received tidak boleh melebihi qty ordered
```

**Kondisi 2: Penerimaan Transfer dari Cabang Lain**
```
Field: Reference Number
Type: Dropdown (Single Select)
Label: "Transfer Number *"
Options: List semua Transfer yang status = IN TRANSIT ke cabang ini
Format: TR-{FROM}-{TO}-{YYYYMMDD}-{SEQ}
Example: TR-JKT-BDG-20260102-001

Mandatory: YES
Validation:
- Transfer harus dalam status IN TRANSIT
- To Location harus match dengan cabang user saat ini
```

**Kondisi 3: Stock Adjustment (Penambahan Stok)**
```
Field: Reference Number
Type: Text Input
Label: "Nomor Berita Acara *"
Format: BA-{TYPE}-{YYYYMMDD}-{SEQ}
Example: BA-ADJ-20260102-001

Mandatory: YES
Instruction: "Masukkan nomor Berita Acara Stock Opname/Adjustment"

Additional Field:
- Attachment: [File Upload] - Scan/foto berita acara (PDF/Image)
- Approved By: [Text] - Nama pihak yang menyetujui
- Reason: [Dropdown]
  - Stock Opname Result
  - Found Stock
  - Correction Entry
  - Other
```

---

### **B. Stock OUT (Barang Keluar)**

**Kondisi 1: Pengiriman Sales Order**
```
Field: Reference Number
Type: Dropdown (Single Select)
Label: "SO Number *"
Options: List semua SO yang sudah APPROVED namun belum fully delivered
Format: SO-{BRANCH}-{YYYYMMDD}-{SEQ}
Example: SO-JKT-20260102-001

Mandatory: YES
Validation:
- SO harus dalam status APPROVED atau PARTIALLY DELIVERED
- Qty delivered tidak boleh melebihi qty ordered
```

**Kondisi 2: Pengiriman Transfer ke Cabang Lain**
```
Field: Reference Number
Type: Auto-generated from Transfer Creation
Label: "Transfer Number *"
Format: TR-{FROM}-{TO}-{YYYYMMDD}-{SEQ}
Example: TR-JKT-BDG-20260102-001

Mandatory: YES (auto-filled)
Note: Stock out otomatis terjadi saat status transfer berubah ke IN TRANSIT
```

**Kondisi 3: Stock Adjustment (Pengurangan Stok)**
```
Field: Reference Number
Type: Text Input
Label: "Nomor Berita Acara *"
Format: BA-{TYPE}-{YYYYMMDD}-{SEQ}
Example: BA-ADJ-20260102-001 (untuk adjustment)
         BA-DSP-20260102-001 (untuk disposal/pemusnahan)

Mandatory: YES

Additional Fields:
- Adjustment Type: [Dropdown]
  - Stock Opname Result (Shrinkage)
  - Damaged Goods
  - Expired Products
  - Lost/Stolen
  - Correction Entry
  - Other

- Attachment: [File Upload] - Scan/foto berita acara
- Approved By: [Text] - Nama pihak yang menyetujui
- Witness: [Text] - Nama saksi (untuk disposal)
- Notes: [Text Area] - Keterangan detail
```

**⚠️ KHUSUS UNTUK DISPOSAL (Pemusnahan Barang):**
```
Untuk barang expired atau rusak yang harus dimusnahkan:

1. Nomor Berita Acara Pemusnahan * : BA-DSP-{YYYYMMDD}-{SEQ}
2. Destruction Method *              : [Dropdown]
                                       - Incineration (Pembakaran)
                                       - Return to Supplier
                                       - Landfill
                                       - Other
3. Witness Name *                    : [Text] - Nama saksi pemusnahan
4. Witness Position                  : [Text] - Jabatan saksi
5. Photo Evidence                    : [Multi-file Upload] - Foto proses pemusnahan
6. Official Letter Attachment *      : [File Upload] - Surat izin/perintah pemusnahan
```

---

### **C. Implementasi UI untuk Reference Number Dinamis**

**Contoh: Form Input Stock Movement (untuk manual adjustment)**

```tsx
// Pseudo-code untuk form dinamis

<Form>
  {/* Step 1: Pilih Tipe Movement */}
  <Select name="movementType" label="Tipe Movement *" required>
    <option value="IN">Stock IN (Barang Masuk)</option>
    <option value="OUT">Stock OUT (Barang Keluar)</option>
  </Select>

  {/* Step 2: Pilih Sub-Tipe (hanya untuk adjustment/manual) */}
  {movementType === 'IN' && (
    <Select name="inType" label="Jenis Penerimaan *" required>
      <option value="PO">Dari Purchase Order (Good Receipt)</option>
      <option value="TRANSFER">Dari Transfer Cabang Lain</option>
      <option value="ADJUSTMENT">Adjustment/Koreksi Stok</option>
    </Select>
  )}

  {movementType === 'OUT' && (
    <Select name="outType" label="Jenis Pengeluaran *" required>
      <option value="SO">Untuk Sales Order</option>
      <option value="TRANSFER">Transfer ke Cabang Lain</option>
      <option value="ADJUSTMENT">Adjustment/Koreksi Stok</option>
      <option value="DISPOSAL">Pemusnahan (Damaged/Expired)</option>
    </Select>
  )}

  {/* Step 3: Reference Number (Dinamis berdasarkan pilihan) */}
  {inType === 'PO' && (
    <Select name="referenceNumber" label="PO Number *" required>
      {/* List PO yang eligible */}
      <option value="PO-2025-001">PO-2025-001 - PT Supplier Jaya</option>
      <option value="PO-2025-002">PO-2025-002 - CV Maju Terus</option>
    </Select>
  )}

  {inType === 'TRANSFER' && (
    <Select name="referenceNumber" label="Transfer Number *" required>
      {/* List Transfer IN TRANSIT ke cabang ini */}
      <option value="TR-JKT-BDG-20260102-001">TR-JKT-BDG-20260102-001 (dari Jakarta)</option>
    </Select>
  )}

  {(inType === 'ADJUSTMENT' || outType === 'ADJUSTMENT' || outType === 'DISPOSAL') && (
    <>
      <Input
        name="referenceNumber"
        label="Nomor Berita Acara *"
        placeholder="BA-ADJ-20260102-001"
        required
      />
      <FileUpload
        name="baAttachment"
        label="Upload Berita Acara *"
        accept=".pdf,.jpg,.png"
        required
      />
      <Input name="approvedBy" label="Disetujui Oleh *" required />
    </>
  )}

  {/* Step 4: Item Details (dengan Batch & ED) */}
  <ItemsTable>
    <Columns>
      <Column field="product" label="Produk *" />
      <Column field="batchNumber" label="Batch Number *" />
      <Column field="expiredDate" label="Expired Date *" />
      <Column field="quantity" label="Qty *" />
      <Column field="unit" label="Unit" />
    </Columns>
  </ItemsTable>
</Form>
```

---

## 📊 SUMMARY TABLE: Add Data Requirements

| No | Fitur Gudang | Perlu Tombol "Add Data"? | Sumber Data | Batch & ED Required? |
|----|--------------|--------------------------|-------------|---------------------|
| 1 | Stock Inquiry | ❌ TIDAK | Otomatis dari semua transaksi | Display Only |
| 2 | Transfer Antar Cabang | ✅ YA (Create Transfer) | Manual input oleh User Gudang | ✅ YA - MANDATORY |
| 3 | Stock Movement | ❌ TIDAK | Otomatis dari semua transaksi | ✅ YA - AUTO RECORDED |
| 4 | Generate Barcode | ✅ YA (Generate) | Manual input oleh User Gudang | ✅ YA - MANDATORY |
| 5 | Good Receipt (dari PO) | ✅ YA* | Semi-otomatis (dari PO) | ✅ YA - MANDATORY |
| 6 | Stock Adjustment/Opname | ✅ YA* | Manual dengan BA | ✅ YA - MANDATORY |

*Catatan: Good Receipt dan Stock Adjustment biasanya ada di modul tersendiri atau terintegrasi dengan modul lain

---

## 🔒 VALIDATION RULES UMUM

### A. Batch Number Validation
```
1. Format: Batch number sesuai format supplier/produsen
2. Unique: Batch number harus unique per produk
3. Required: Mandatory untuk semua transaksi barang masuk/keluar
4. Traceability: Sistem harus bisa trace batch dari receipt sampai sales
```

### B. Expired Date Validation
```
1. Format: DD/MM/YYYY atau YYYY-MM-DD
2. Required: Mandatory untuk semua produk dengan ED
3. Warning Levels:
   - RED Alert: ED < 1 bulan
   - ORANGE Alert: ED < 3 bulan
   - YELLOW Alert: ED < 6 bulan
4. Block: Tidak bisa terima barang dengan ED < 3 bulan (configurable)
5. FIFO/FEFO: Sistem harus enforce First Expired First Out
```

### C. Reference Number Validation
```
1. Uniqueness: Reference number harus unique
2. Format validation: Sesuai pattern yang ditentukan
3. Existence check:
   - Untuk PO/SO: Harus exist di database
   - Untuk BA: Attachment mandatory
4. Status check: PO/SO harus dalam status yang benar
```

---

## 📝 ADDITIONAL RECOMMENDATIONS

### 1. **Fitur Tambahan yang Disarankan**

**A. Good Receipt Entry (Penerimaan Barang dari PO)**
```
Location: Bisa di Modul Gudang atau Pembelian
Button: "Receive Goods" / "Terima Barang"

Form Fields:
1. GR Number                : [Auto] GR-{YYYY}-{SEQ}
2. PO Number *              : [Dropdown] - List PO approved
3. Receipt Date             : [Date] - Default: today
4. Received By              : [Auto] - Current user
5. Supplier Name            : [Auto-fill from PO]

Item Details:
6. Product                  : [From PO items]
7. Batch Number *           : [Text Input] - dari supplier
8. Expired Date *           : [Date Picker] - dari supplier
9. Qty Ordered              : [Read-only from PO]
10. Qty Received *          : [Number Input] - actual received
11. Qty Rejected            : [Number Input] - jika ada reject
12. Reject Reason           : [Text Area] - jika ada reject
13. Quality Status          : [Dropdown]
                              - PASS
                              - PASS WITH NOTES
                              - QUARANTINE
                              - REJECT

14. Notes                   : [Text Area]
15. Photo Evidence          : [File Upload] - foto barang yang diterima

[Button: Save as Draft]
[Button: Confirm Receipt]
```

**B. Stock Adjustment Entry**
```
Location: Modul Gudang
Button: "Stock Adjustment" / "Adjustment Stok"

Form Fields:
1. Adjustment Number        : [Auto] ADJ-{YYYY}-{SEQ}
2. Adjustment Date          : [Date] - Default: today
3. Adjustment Type *        : [Dropdown]
                              - Stock Opname Result
                              - Damage/Expired
                              - Found Stock
                              - Correction
4. Berita Acara Number *    : [Text Input]
5. Berita Acara Attachment *: [File Upload]
6. Approved By *            : [Text Input]
7. Witness (if disposal)    : [Text Input]

Item Details:
8. Product *                : [Search/Select]
9. Batch Number *           : [Dropdown] - existing batches
10. Expired Date            : [Read-only] - from batch
11. System Qty              : [Read-only] - qty in system
12. Actual Qty *            : [Number Input] - actual count
13. Variance                : [Auto-calc] = Actual - System
14. Variance Value          : [Auto-calc] = Variance × Cost
15. Reason *                : [Text Area]

[Button: Save as Draft]
[Button: Submit for Approval]
```

### 2. **Integration Points**

```
Modul Gudang harus terintegrasi dengan:

1. Pembelian (Purchasing):
   - Terima data PO untuk Good Receipt
   - Update status PO setelah barang diterima
   - Trigger untuk create AP Invoice

2. Penjualan (Sales):
   - Terima data SO untuk stock allocation
   - Update stok saat barang dikirim
   - Validation stock availability

3. Stock Opname:
   - Terima hasil opname untuk adjustment
   - Update stok berdasarkan variance yang diapprove

4. Accounting:
   - Kirim data untuk inventory valuation
   - Create journal entry untuk stock movement
   - Update inventory account
```

### 3. **Reporting Requirements**

```
Laporan yang harus bisa di-generate:

1. Stock Movement Report
   - By Date Range
   - By Product
   - By Batch Number
   - By Reference Type

2. Batch Tracking Report
   - Batch lifecycle from receipt to sales
   - Current batch locations
   - Batch expiry forecast

3. Expired Date Alert Report
   - Products expiring in next 1/3/6 months
   - Grouped by product/location
   - With recommended actions (transfer/promo/disposal)

4. Stock Value Report
   - By location
   - By batch
   - With aging analysis
```

---

## ✅ NEXT STEPS

1. **Design Database Schema**
   - Create tables untuk stock_movements dengan batch tracking
   - Create index untuk efficient querying

2. **Develop UI Components**
   - Dynamic Reference Number field component
   - Batch selector component dengan ED display
   - Stock movement log viewer

3. **Implement Business Logic**
   - FEFO (First Expired First Out) logic
   - Reference number validation
   - Batch tracking workflow

4. **Testing**
   - Test semua skenario stock movement
   - Test batch expiry validations
   - Test reference number integrations

5. **User Training**
   - Train user tentang pentingnya batch tracking
   - Train tentang berita acara requirements
   - Train tentang proper stock handling

---

**Document Version:** 1.0
**Last Updated:** 2026-01-02
**Prepared By:** System Analyst
**Status:** Ready for Implementation
