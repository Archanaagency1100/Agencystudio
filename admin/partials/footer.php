        </div> <!-- End .content-wrapper -->
    </main> <!-- End .admin-main -->

    <!-- Sidebar and Global JavaScript Interactions -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const toggleBtn = document.getElementById('toggle-sidebar');
            const sidebar = document.getElementById('sidebar');
            
            if (toggleBtn && sidebar) {
                toggleBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    sidebar.classList.toggle('active');
                });
                
                // Close sidebar when clicking outside of it on mobile
                document.addEventListener('click', function(e) {
                    if (window.innerWidth <= 991 && sidebar.classList.contains('active')) {
                        if (!sidebar.contains(e.target) && e.target !== toggleBtn) {
                            sidebar.classList.remove('active');
                        }
                    }
                });
            }
        });
    </script>
    
    <?php if (isset($extra_js)): echo $extra_js; endif; ?>
</body>
</html>
