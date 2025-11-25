- Xem phần [Khắc phục lỗi Java](#lỗi-1-java-is-not-recognized)

---

## 📥 BƯỚC 2: CÀI ĐẶT ECLIPSE

Eclipse là công cụ để chạy code Java.

### **2.1. Tải Eclipse**

1. Vào trang: https://www.eclipse.org/downloads/
2. Click nút **"Download"** màu cam
3. Click **"Download"** lần nữa
4. File tải về: **`eclipse-inst-jre-win64.exe`** (khoảng 60MB)

### **2.2. Cài đặt Eclipse**

1. **Mở file vừa tải**
2. Chọn: **"Eclipse IDE for Enterprise Java and Web Developers"**
3. Chọn thư mục cài đặt (để mặc định hoặc chọn ổ D:\)
4. Click **"Install"**
5. **ĐỢI** 5-10 phút để cài đặt
6. Click **"Launch"** khi hoàn tất

### **2.3. Chọn Workspace**

Lần đầu mở Eclipse, nó sẽ hỏi **"workspace"** (nơi lưu project):

1. Chọn thư mục: `E:\K1N3\LTM` (hoặc nơi bạn lưu project)
2. Tick ✅ **"Use this as the default"**
3. Click **"Launch"**

---

## 📥 BƯỚC 3: CÀI ĐẶT TOMCAT

Tomcat là "Web Server" để chạy website.

### **3.1. Tải Tomcat**

1. Vào trang: https://tomcat.apache.org/download-10.cgi
2. Cuộn xuống phần **"Binary Distributions"** → **"Core"**
3. Click tải: **"64-bit Windows zip"** (file `.zip`, khoảng 12MB)

### **3.2. Giải nén Tomcat**

1. Mở thư mục `Downloads`
2. Click phải vào file `apache-tomcat-10.1.x.zip`
3. Chọn: **"Extract All..."**
4. Chọn đường dẫn: `C:\tomcat` (tạo folder `tomcat` mới)
5. Click **"Extract"**

### **3.3. Thêm Tomcat vào Eclipse**

1. Mở **Eclipse**
2. Click menu: **Window** → **Preferences**
3. Mở: **Server** → **Runtime Environments**
4. Click **"Add..."**
5. Chọn: **"Apache Tomcat v10.1"**
6. Click **"Next"**
7. Click **"Browse..."**
8. Chọn thư mục: `C:\tomcat\apache-tomcat-10.1.x`
9. Click **"Finish"** → **"Apply and Close"**

---

## 📥 BƯỚC 4: CÀI ĐẶT FFMPEG

FFmpeg là công cụ chuyển đổi file audio/video.

### **4.1. Tải FFmpeg**

1. Vào trang: https://www.gyan.dev/ffmpeg/builds/
2. Click tải: **"ffmpeg-release-essentials.zip"** (khoảng 80MB)

### **4.2. Giải nén FFmpeg**

1. Giải nén file `.zip` vừa tải
2. Copy thư mục `ffmpeg-xxx-essentials_build` vào `C:\`
3. Đổi tên thành: `C:\ffmpeg`

### **4.3. Thêm FFmpeg vào PATH**

**Đây là bước QUAN TRỌNG!**

1. Nhấn phím **Windows + R**
2. Gõ: `sysdm.cpl` → Nhấn **Enter**
3. Click tab **"Advanced"** (Nâng cao)
4. Click nút **"Environment Variables..."** (Biến môi trường)
5. Tìm biến **"Path"** trong **"System variables"**
6. Click **"Edit..."**
7. Click **"New"**
8. Gõ: `C:\ffmpeg\bin`
9. Click **"OK"** → **"OK"** → **"OK"**

### **4.4. Kiểm tra FFmpeg**

1. Mở **Command Prompt** (Windows + R → gõ `cmd` → Enter)
2. Gõ: `ffmpeg -version`
3. Nhấn **Enter**

**✅ Kết quả đúng:**
```
ffmpeg version x.x.x
```

**❌ Nếu báo lỗi:** Xem phần [Khắc phục lỗi FFmpeg](#lỗi-2-ffmpeg-is-not-recognized)

---

## 📥 BƯỚC 5: TẢI VOSK MODEL

Vosk Model là "bộ não" để nhận diện giọng nói.

### **5.1. Tải Model tiếng Việt**

1. Vào trang: https://alphacephei.com/vosk/models
2. Tìm dòng: **"vosk-model-small-vn-0.4"**
3. Click link để tải (khoảng 70MB)

### **5.2. Tải Model tiếng Anh**

1. Tìm dòng: **"vosk-model-small-en-us-0.15"**
2. Click link để tải (khoảng 40MB)

### **5.3. Giải nén Model**

1. Tạo thư mục: `E:\K1N3\LTM\DUT_NET-MediaVideo\vosk_models`
2. Giải nén 2 file `.zip` vừa tải vào thư mục trên
3. Kết quả phải có 2 thư mục:
   ```
   E:\K1N3\LTM\DUT_NET-MediaVideo\vosk_models\
   ├── vosk-model-small-vn-0.4\
   │   ├── am\
   │   ├── conf\
   │   ├── graph\
   │   └── ...
   └── vosk-model-small-en-us-0.15\
       ├── am\
       ├── conf\
       ├── graph\
       └── ...
   ```

---

## 📂 BƯỚC 6: MỞ PROJECT TRONG ECLIPSE

### **6.1. Import Project**

1. Mở **Eclipse**
2. Click menu: **File** → **Import...**
3. Chọn: **General** → **Existing Projects into Workspace**
4. Click **"Next"**
5. Click **"Browse..."** ở **"Select root directory"**
6. Chọn thư mục: `E:\K1N3\LTM\DUT_NET-MediaVideo`
7. Tick ✅ vào project **"DUT_NET-MediaVideo"**
8. Click **"Finish"**

### **6.2. Kiểm tra Project**

Sau khi import, bạn sẽ thấy trong Eclipse:
```
📁 DUT_NET-MediaVideo
   ├── 📁 src
   │   ├── 📁 Controller
   │   ├── 📁 Filter
   │   ├── 📁 Model
   │   └── 📁 Service
   ├── 📁 WebContent
   │   ├── 📁 views
   │   └── index.jsp
   └── 📁 lib
```

**❌ Nếu thấy nhiều lỗi đỏ:**
- Xem phần [Khắc phục lỗi Project](#lỗi-3-project-có-nhiều-lỗi-đỏ)

---

## 🚀 BƯỚC 7: KHỞI ĐỘNG WORKER TCP SERVER

Worker TCP Server là "bộ não xử lý" - phải chạy trước Web Server.

### **7.1. Mở Command Prompt**

1. Nhấn **Windows + R**
2. Gõ: `cmd`
3. Nhấn **Enter**

### **7.2. Chuyển đến thư mục project**

Gõ lần lượt từng lệnh (nhấn Enter sau mỗi lệnh):

```cmd
E:
cd E:\K1N3\LTM\DUT_NET-MediaVideo
```

### **7.3. Chạy Worker TCP Server**

Gõ lệnh:

```cmd
java -cp "build/classes;lib/*" Service.WorkerTCPServer
```

**✅ Kết quả đúng:**
```
========================================
🚀 WORKER TCP SERVER INITIALIZING...
========================================
Port: 9999
Thread Pool Size: 10
Max Concurrent Tasks: 5 🔥
Max Queue Size: 100
========================================
📦 Loading Vosk models...
✅ Vi model loaded, En model loaded
========================================
✅ Worker TCP Server started on port 9999
⏳ Waiting for connections from Web Server...
```

**🎉 Server đang chạy! ĐỪNG TẮT CỬA SỔ NÀY!**

**❌ Nếu báo lỗi:** Xem phần [Khắc phục lỗi Worker Server](#lỗi-4-worker-server-không-chạy)

---

## 🚀 BƯỚC 8: KHỞI ĐỘNG WEB SERVER

### **8.1. Mở tab Servers trong Eclipse**

1. Trong Eclipse, tìm tab **"Servers"** ở phía dưới
2. Nếu không thấy, click menu: **Window** → **Show View** → **Servers**

### **8.2. Tạo Server mới**

1. Click phải trong tab **"Servers"**
2. Chọn: **New** → **Server**
3. Chọn: **Apache** → **Tomcat v10.1 Server**
4. Click **"Next"**
5. Chọn project **"DUT_NET-MediaVideo"** → Click **"Add >"**
6. Click **"Finish"**

### **8.3. Khởi động Server**

1. Click phải vào **"Tomcat v10.1 Server"** trong tab Servers
2. Chọn: **"Start"**
3. **ĐỢI** 10-30 giây cho server khởi động

**✅ Server đã chạy khi thấy:**
```
INFO: Server startup in [xxxx] milliseconds
```

---

## 🎊 BƯỚC 9: SỬ DỤNG CHƯƠNG TRÌNH

### **9.1. Mở trình duyệt**

1. Mở **Google Chrome** hoặc **Firefox**
2. Vào địa chỉ: http://localhost:8080/DUT_NET-MediaVideo/

### **9.2. Đăng nhập**

Trang đăng nhập sẽ hiện ra:

- **Username:** `admin` (hoặc `user`)
- **Password:** `admin123` (hoặc `user123`)
- Click **"Đăng Nhập"**

### **9.3. Upload file audio/video**

1. Click nút **"Upload TCP"** trên menu
2. Click vào **"Kéo thả file vào đây hoặc click để chọn"**
3. Chọn file audio/video (MP3, MP4, WAV, AVI, v.v.)
4. Chọn ngôn ngữ: **Tiếng Việt** hoặc **English**
5. Click nút **"Bắt Đầu Xử Lý"**

### **9.4. Xem kết quả**

- **Thanh progress bar** sẽ hiện ra → Đợi xử lý (30 giây - 5 phút tùy file)
- Kết quả sẽ hiện trong khung màu xanh:
  ```
  ✅ Xử lý thành công!
  
  📝 Kết quả:
  chào mừng quý vị và các bạn đến với buổi thảo luận chuyên sâu...
  
  ⏱ Thời gian xử lý: 45.3 giây
  ```

### **9.5. Xem lịch sử**

1. Click nút **"Lịch Sử"** trên menu
2. Bạn sẽ thấy danh sách tất cả file đã xử lý:
   - Tên file
   - Ngôn ngữ
   - Trạng thái (Hoàn thành / Đang xử lý / Thất bại)
   - Thời gian xử lý
   - Kết quả văn bản

---

## 🛑 TẮT CHƯƠNG TRÌNH

### **Khi muốn tắt chương trình:**

1. **Tắt Web Server:**
   - Trong Eclipse, tab **"Servers"**
   - Click phải vào **"Tomcat v10.1 Server"**
   - Chọn: **"Stop"**

2. **Tắt Worker TCP Server:**
   - Quay lại cửa sổ **Command Prompt** (đang chạy Worker Server)
   - Nhấn **Ctrl + C**
   - Gõ: `Y` → Nhấn **Enter**

---

## ❌ KHẮC PHỤC LỖI THƯỜNG GẶP

### **Lỗi 1: "java is not recognized"**

**Nguyên nhân:** Java chưa được thêm vào PATH

**Cách sửa:**
1. Tìm thư mục cài Java (thường ở `C:\Program Files\Java\jdk-17`)
2. Copy đường dẫn đến thư mục `bin`, ví dụ: `C:\Program Files\Java\jdk-17\bin`
3. Thêm vào PATH (xem hướng dẫn ở [Bước 4.3](#43-thêm-ffmpeg-vào-path))

---

### **Lỗi 2: "ffmpeg is not recognized"**

**Nguyên nhân:** FFmpeg chưa được thêm vào PATH

**Cách sửa:**

1. Kiểm tra thư mục `C:\ffmpeg\bin` có tồn tại không
2. Nếu có, làm lại [Bước 4.3](#43-thêm-ffmpeg-vào-path)
3. **QUAN TRỌNG:** Sau khi thêm PATH, phải **ĐÓNG VÀ MỞ LẠI** Command Prompt

---

### **Lỗi 3: Project có nhiều lỗi đỏ**

**Nguyên nhân:** Thiếu thư viện (JAR files)

**Cách sửa:**

1. Trong Eclipse, click phải vào project **"DUT_NET-MediaVideo"**
2. Chọn: **Build Path** → **Configure Build Path...**
3. Click tab **"Libraries"**
4. Click **"Add JARs..."**
5. Mở thư mục `DUT_NET-MediaVideo/lib`
6. Chọn **TẤT CẢ** file `.jar` trong thư mục
7. Click **"OK"** → **"Apply and Close"**

---

### **Lỗi 4: Worker Server không chạy**

**Lỗi: "Port 9999 already in use"**

**Nguyên nhân:** Đã có Worker Server khác đang chạy

**Cách sửa:**

1. Mở **Task Manager** (Ctrl + Shift + Esc)
2. Tìm process **"java.exe"**
3. Click phải → **"End Task"**
4. Chạy lại Worker Server

---

**Lỗi: "Vosk model not found"**

**Nguyên nhân:** Chưa tải hoặc đặt sai thư mục Vosk models

**Cách sửa:**

1. Kiểm tra thư mục: `E:\K1N3\LTM\DUT_NET-MediaVideo\vosk_models`
2. Phải có 2 thư mục:
   - `vosk-model-small-vn-0.4`
   - `vosk-model-small-en-us-0.15`
3. Nếu chưa có, làm lại [Bước 5](#bước-5-tải-vosk-model)

---

### **Lỗi 5: Web Server không chạy**

**Lỗi: "Port 8080 already in use"**

**Nguyên nhân:** Đã có Tomcat khác đang chạy

**Cách sửa:**

1. Mở **Task Manager** (Ctrl + Shift + Esc)
2. Tìm process **"javaw.exe"** hoặc **"Tomcat"**
3. Click phải → **"End Task"**
4. Chạy lại Web Server trong Eclipse

---

**Lỗi: "HTTP Status 404 – Not Found"**

**Nguyên nhân:** Sai đường dẫn URL

**Cách sửa:**

- Đảm bảo URL đúng: `http://localhost:8080/DUT_NET-MediaVideo/`
- **PHẢI có dấu `/` ở cuối!**

---

### **Lỗi 6: Upload file nhưng không có kết quả**

**Nguyên nhân:** Worker TCP Server chưa chạy hoặc bị lỗi

**Cách sửa:**

1. Kiểm tra cửa sổ Command Prompt (Worker Server) có bị lỗi không
2. Nếu có lỗi, đọc thông báo lỗi và xử lý
3. Thử chạy lại Worker Server

---

### **Lỗi 7: Hiển thị lỗi font tiếng Việt**

**Ví dụ:** `chÃ o má»«ng` thay vì `chào mừng`

**Nguyên nhân:** Lỗi encoding UTF-8 (đã được fix trong code mới)

**Cách sửa:**

1. Đảm bảo bạn đang dùng **code mới nhất**
2. Khởi động lại Worker TCP Server
3. Upload lại file mới (file cũ trong database vẫn bị lỗi)

---

## 💡 MẸO SỬ DỤNG

### **Mẹo 1: Xử lý nhiều file cùng lúc**

- Server hỗ trợ xử lý **5 file đồng thời**
- File thứ 6 trở đi sẽ đợi trong hàng chờ
- Bạn có thể upload nhiều file liên tiếp mà không cần đợi file trước xong

### **Mẹo 2: File audio/video nào được hỗ trợ?**

Hỗ trợ hầu hết các định dạng:
- **Audio:** MP3, WAV, M4A, AAC, FLAC, OGG
- **Video:** MP4, AVI, MKV, MOV, WMV, FLV

### **Mẹo 3: Kích thước file tối đa?**

- Giới hạn: **100MB** mỗi file
- Nếu file lớn hơn, nén lại hoặc cắt nhỏ ra

### **Mẹo 4: Thời gian xử lý bao lâu?**

- File 1 phút: ~30 giây
- File 5 phút: ~1-2 phút
- File 30 phút: ~5-10 phút

### **Mẹo 5: Độ chính xác như thế nào?**

- **Tiếng Việt chuẩn, không vùng:** 85-95%
- **Tiếng Anh chuẩn:** 90-95%
- **Âm thanh nhiễu, giọng địa phương:** 60-80%

---

## 📞 HỖ TRỢ

Nếu gặp lỗi không nằm trong danh sách trên:

1. **Chụp màn hình lỗi** (nhấn Print Screen)
2. **Copy toàn bộ thông báo lỗi** từ Command Prompt hoặc Eclipse
3. Liên hệ người phát triển để được hỗ trợ

---

## 🎉 CHÚC MỪNG!

Bạn đã cài đặt và chạy thành công chương trình! 🎊

**Giờ bạn có thể:**
- ✅ Upload file audio/video
- ✅ Chuyển đổi giọng nói thành văn bản
- ✅ Xem lịch sử các file đã xử lý
- ✅ Hỗ trợ tiếng Việt và tiếng Anh

**Chúc bạn sử dụng vui vẻ!** 😊

---

**Phiên bản:** 1.0  
**Ngày cập nhật:** 20/11/2025  
**Tác giả:** DUT NET-MediaVideo Team