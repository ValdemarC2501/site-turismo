/* ========================================
   TURISMO FOZ - SISTEMA OTIMIZADO
   Paula & Ademilson - Guias Turísticos
   ======================================== */

// ===== INICIALIZAÇÃO PRINCIPAL =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar sistemas principais
    initScrollEffects();
    initNavigation();
    initHeroAnimations();
    initDestinationCards();
    initRatingSystem();
    initModals();
    initDestinationSearch();
    initCompactNavigation();
    initFloatingElements();
    initSmoothScroll();
    initNotificationSystem();
    initFooterNavigation();
    addScrollToTop();
    improveAccessibility();
    
    // Carregar reviews salvos
    loadSavedReviews();
    
    // Inicializar melhorias visuais
    initEnhancements();
});

// ========================================
// EFEITOS DE SCROLL MODERNOS
// ========================================
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    const heroScrollIndicator = document.querySelector('.hero-scroll-indicator');
    let ticking = false;
    
    function updateScrollEffects() {
        const scrollY = window.scrollY;
        
        // Navbar com efeito blur
        if (navbar) {
            navbar.classList.toggle('scrolled', scrollY > 100);
        }
        
        // Ocultar indicador de scroll
        if (heroScrollIndicator) {
            heroScrollIndicator.style.opacity = scrollY > 200 ? '0' : '1';
        }
        
        // Parallax no hero
        const hero = document.querySelector('.hero');
        if (hero && scrollY < window.innerHeight) {
            hero.style.transform = `translateY(${scrollY * 0.5}px)`;
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
    
    // Animação de fade-in para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    document.querySelectorAll('.destination-card, .guide-card, .rating-form, .reviews-list, .section-title').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// ========================================
// NAVEGAÇÃO MODERNA
// ========================================
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Fechar menu ao clicar em link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        });
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (navToggle && navMenu && 
            !navToggle.contains(e.target) && 
            !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// ========================================
// ANIMAÇÕES DO HERO
// ========================================
function initHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    
    // Animação sequencial dos elementos do hero
    setTimeout(() => {
        if (heroTitle) {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }
    }, 300);
    
    setTimeout(() => {
        if (heroSubtitle) {
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }
    }, 600);
    
    setTimeout(() => {
        if (heroButtons) {
            heroButtons.style.opacity = '1';
            heroButtons.style.transform = 'translateY(0)';
        }
    }, 900);
    
    // Scroll suave para o indicador
    const scrollIndicator = document.querySelector('.hero-scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const destinosSection = document.querySelector('#destinos');
            if (destinosSection) {
                destinosSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// ========================================
// CARDS DE DESTINO INTERATIVOS
// ========================================
function initDestinationCards() {
    const cards = document.querySelectorAll('.destination-card');
    
    cards.forEach(card => {
        // Efeito de hover
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
        
        // Efeito de clique
        card.addEventListener('click', (e) => {
            card.style.transform = 'translateY(-5px) scale(0.98)';
            setTimeout(() => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            }, 150);
        });
    });
}

// ========================================
// SISTEMA DE AVALIAÇÃO MODERNO
// ========================================
function initRatingSystem() {
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('rating');
    const reviewForm = document.getElementById('reviewForm');
    
    // Sistema de estrelas interativo
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            const rating = index + 1;
            if (ratingInput) ratingInput.value = rating;
            updateStars(rating);
            
            // Feedback visual
            star.style.transform = 'scale(1.3)';
            setTimeout(() => {
                star.style.transform = 'scale(1)';
            }, 200);
        });
        
        star.addEventListener('mouseenter', () => {
            const rating = index + 1;
            highlightStars(rating);
        });
    });
    
    // Reset ao sair da área de estrelas
    const starRating = document.querySelector('.star-rating');
    if (starRating) {
        starRating.addEventListener('mouseleave', () => {
            const currentRating = ratingInput ? ratingInput.value : 0;
            updateStars(currentRating);
        });
    }
    
    // Envio do formulário
    if (reviewForm) {
        reviewForm.addEventListener('submit', handleReviewSubmission);
    }
}

function updateStars(rating) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        star.classList.toggle('active', index < rating);
    });
}

function highlightStars(rating) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.style.color = '#ffd700';
            star.style.transform = 'scale(1.1)';
        } else {
            star.style.color = '#ddd';
            star.style.transform = 'scale(1)';
        }
    });
}

function handleReviewSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const reviewData = {
        name: formData.get('customerName'),
        email: formData.get('customerEmail'),
        rating: formData.get('rating'),
        comment: formData.get('reviewText'),
        date: new Date().toLocaleDateString('pt-BR')
    };
    
    // Validação
    if (!reviewData.name || !reviewData.email || !reviewData.rating || !reviewData.comment) {
        showNotification('Por favor, preencha todos os campos!', 'error');
        return;
    }
    
    if (reviewData.rating < 1 || reviewData.rating > 5) {
        showNotification('Por favor, selecione uma avaliação de 1 a 5 estrelas!', 'error');
        return;
    }
    
    // Salvar avaliação
    saveReview(reviewData);
    
    // Limpar formulário
    e.target.reset();
    updateStars(0);
    
    // Mostrar notificação de sucesso
    showNotification('Avaliação enviada com sucesso! Obrigado pelo seu feedback.', 'success');
    
    // Recarregar avaliações
    loadSavedReviews();
}

// ========================================
// SISTEMA DE MODAIS
// ========================================
function initModals() {
    // Fechar modal ao clicar fora
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target.id);
        }
    });
    
    // Fechar modal com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal[style*="block"]');
            if (openModal) {
                closeModal(openModal.id);
            }
        }
    });
}

// ========================================
// MELHORIAS AVANÇADAS DOS MODAIS
// ========================================

// Função melhorada para abrir modais com mais funcionalidades
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) {
        handleMissingModal(modalId);
        return;
    }
    
    // Fechar outros modais
    document.querySelectorAll('.modal').forEach(m => {
        if (m.id !== modalId) {
            m.style.display = 'none';
        }
    });
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Adicionar classe para animação
    modal.classList.add('modal-opening');
    
    // Animação de entrada melhorada
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.style.transform = 'translateY(50px) scale(0.9)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            modalContent.style.transform = 'translateY(0) scale(1)';
            modalContent.style.opacity = '1';
            modal.classList.remove('modal-opening');
        }, 10);
    }
    
    // Adicionar funcionalidades específicas do modal
    addModalEnhancements(modal, modalId);
    
    // Analytics (opcional)
    trackModalOpen(modalId);
}

// Função para fechar modais
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    const modalContent = modal.querySelector('.modal-content');
    
    // Animação de saída
    if (modalContent) {
        modalContent.style.transform = 'translateY(50px) scale(0.9)';
        modalContent.style.opacity = '0';
    }
    
    // Fechar modal após animação
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        modal.classList.remove('modal-opening');
        
        // Resetar transformações
        if (modalContent) {
            modalContent.style.transform = '';
            modalContent.style.opacity = '';
        }
        
        // Remover modal temporário se existir
        if (modalId === 'temp-modal') {
            modal.remove();
        }
    }, 300);
}

// Função para lidar com modais não encontrados
function handleMissingModal(modalId) {
    const destinationNames = {
        'modal-cataratas': 'Cataratas do Iguaçu',
        'modal-marco': 'Marco das Três Fronteiras',
        'modal-itaipu': 'Usina de Itaipu',
        'modal-city-tour': 'City Tour Foz do Iguaçu',
        'modal-compras-paraguai': 'Compras no Paraguai',
        'modal-yup-star': 'Yup Star Roda Gigante',
        'modal-vale-dinossauros': 'Vale dos Dinossauros',
        'modal-helicoptero': 'Passeio de Helicóptero',
        'modal-marco-argentino': 'Marco Argentino',
        'modal-macuco-safari': 'Macuco Safari',
        'modal-movie-cars': 'Movie Cars',
        'modal-parque-aves': 'Parque das Aves',
        'modal-katamaran': 'Katamaran Foz',
        'modal-feirinha-puerto-iguazu': 'Feirinha de Puerto Iguazu',
        'modal-jantar-puerto-iguazu': 'Jantar em Puerto Iguazu',
        'modal-museu-cera': 'Museu de Cera',
        'modal-vida-sem-paredes': 'Vida sem Paredes'
    };
    
    const destinationName = destinationNames[modalId] || 'Este destino';
    
    // Criar modal temporário com informações de contato
    const tempModal = document.createElement('div');
    tempModal.className = 'modal';
    tempModal.id = 'temp-modal';
    tempModal.style.display = 'block';
    
    tempModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2><i class="fas fa-info-circle"></i> ${destinationName}</h2>
                <span class="close" onclick="closeModal('temp-modal')">&times;</span>
            </div>
            <div class="modal-body">
                <div class="modal-description">
                    <p>Informações detalhadas sobre este destino estão sendo preparadas!</p>
                    <p>Entre em contato conosco para mais informações e agendamento:</p>
                </div>
                <div class="direct-contact-section" style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #25d366, #128c7e); border-radius: 12px; text-align: center;">
                    <h4 style="color: white; margin-bottom: 15px;">
                        <i class="fas fa-phone"></i> Entre em Contato
                    </h4>
                    <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                        <a href="https://wa.me/5545998611000?text=Olá Paula! Gostaria de saber mais sobre ${destinationName}." 
                           target="_blank" 
                           style="display: flex; align-items: center; gap: 8px; padding: 12px 20px; background: rgba(255,255,255,0.2); color: white; text-decoration: none; border-radius: 25px; font-weight: 600;">
                            <i class="fab fa-whatsapp"></i> Paula
                        </a>
                        <a href="https://wa.me/5545999755650?text=Olá Ademilson! Gostaria de saber mais sobre ${destinationName}." 
                           target="_blank" 
                           style="display: flex; align-items: center; gap: 8px; padding: 12px 20px; background: rgba(255,255,255,0.2); color: white; text-decoration: none; border-radius: 25px; font-weight: 600;">
                            <i class="fab fa-whatsapp"></i> Ademilson
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(tempModal);
    document.body.style.overflow = 'hidden';
    
    // Remover modal temporário quando fechado
    tempModal.addEventListener('click', (e) => {
        if (e.target === tempModal) {
            closeModal('temp-modal');
        }
    });
}

// Adicionar melhorias específicas para cada modal
function addModalEnhancements(modal, modalId) {
    // Adicionar botão de compartilhamento
    addShareButton(modal, modalId);
    
    // Adicionar botão de favoritos
    addFavoriteButton(modal, modalId);
    
    // Adicionar galeria de imagens se houver múltiplas imagens
    initModalImageGallery(modal);
    
    // Adicionar botão de contato direto
    addDirectContactButton(modal, modalId);
    
    // Adicionar informações de preço (se disponível)
    addPricingInfo(modal, modalId);
}

// Adicionar botão de compartilhamento
function addShareButton(modal, modalId) {
    const modalHeader = modal.querySelector('.modal-header');
    if (!modalHeader || modalHeader.querySelector('.share-btn')) return;
    
    const shareBtn = document.createElement('button');
    shareBtn.className = 'share-btn';
    shareBtn.innerHTML = '<i class="fas fa-share-alt"></i>';
    shareBtn.title = 'Compartilhar';
    shareBtn.style.cssText = `
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        cursor: pointer;
        margin-left: 10px;
        transition: all 0.3s ease;
    `;
    
    shareBtn.addEventListener('click', () => shareDestination(modalId));
    shareBtn.addEventListener('mouseenter', () => {
        shareBtn.style.background = 'rgba(255, 255, 255, 0.3)';
    });
    shareBtn.addEventListener('mouseleave', () => {
        shareBtn.style.background = 'rgba(255, 255, 255, 0.2)';
    });
    
    modalHeader.insertBefore(shareBtn, modalHeader.querySelector('.close'));
}

// Função para compartilhar destino
function shareDestination(modalId) {
    const destinationNames = {
        'modal-cataratas': 'Cataratas do Iguaçu',
        'modal-marco': 'Marco das Três Fronteiras',
        'modal-itaipu': 'Usina de Itaipu',
        'modal-city-tour': 'City Tour Foz do Iguaçu',
        'modal-compras-paraguai': 'Compras no Paraguai',
        'modal-yup-star': 'Yup Star Roda Gigante',
        'modal-vale-dinossauros': 'Vale dos Dinossauros',
        'modal-helicoptero': 'Passeio de Helicóptero',
        'modal-marco-argentino': 'Marco Argentino',
        'modal-macuco-safari': 'Macuco Safari',
        'modal-movie-cars': 'Movie Cars',
        'modal-parque-aves': 'Parque das Aves',
        'modal-katamaran': 'Katamaran Foz'
    };
    
    const destinationName = destinationNames[modalId] || 'Destino em Foz do Iguaçu';
    const shareText = `Conheça ${destinationName} com os guias Paula & Ademilson! 🌟`;
    const shareUrl = window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: destinationName,
            text: shareText,
            url: shareUrl
        }).catch(console.error);
    } else {
        // Fallback para navegadores que não suportam Web Share API
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
        window.open(whatsappUrl, '_blank');
    }
}

// Adicionar botão de favoritos
function addFavoriteButton(modal, modalId) {
    const modalHeader = modal.querySelector('.modal-header');
    if (!modalHeader || modalHeader.querySelector('.favorite-btn')) return;
    
    const favoriteBtn = document.createElement('button');
    favoriteBtn.className = 'favorite-btn';
    favoriteBtn.innerHTML = '<i class="far fa-heart"></i>';
    favoriteBtn.title = 'Adicionar aos favoritos';
    favoriteBtn.style.cssText = `
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        cursor: pointer;
        margin-left: 10px;
        transition: all 0.3s ease;
    `;
    
    // Verificar se já está nos favoritos
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (favorites.includes(modalId)) {
        favoriteBtn.innerHTML = '<i class="fas fa-heart"></i>';
        favoriteBtn.style.color = '#ff6b6b';
    }
    
    favoriteBtn.addEventListener('click', () => toggleFavorite(modalId, favoriteBtn));
    
    modalHeader.insertBefore(favoriteBtn, modalHeader.querySelector('.share-btn') || modalHeader.querySelector('.close'));
}

// Função para alternar favoritos
function toggleFavorite(modalId, button) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (favorites.includes(modalId)) {
        favorites = favorites.filter(id => id !== modalId);
        button.innerHTML = '<i class="far fa-heart"></i>';
        button.style.color = 'white';
        showNotification('Removido dos favoritos', 'info');
    } else {
        favorites.push(modalId);
        button.innerHTML = '<i class="fas fa-heart"></i>';
        button.style.color = '#ff6b6b';
        showNotification('Adicionado aos favoritos!', 'success');
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Inicializar galeria de imagens no modal
function initModalImageGallery(modal) {
    const images = modal.querySelectorAll('.modal-image img, .modal-gallery img');
    if (images.length <= 1) return;
    
    images.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => openImageLightbox(images, index));
    });
}

// Abrir lightbox para imagens
function openImageLightbox(images, startIndex) {
    const lightbox = document.createElement('div');
    lightbox.className = 'image-lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 10001;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const img = document.createElement('img');
    img.src = images[startIndex].src;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: 8px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 30px;
        background: none;
        border: none;
        color: white;
        font-size: 3rem;
        cursor: pointer;
        z-index: 10002;
    `;
    
    closeBtn.addEventListener('click', () => {
        lightbox.style.opacity = '0';
        setTimeout(() => lightbox.remove(), 300);
    });
    
    lightbox.appendChild(img);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);
    
    setTimeout(() => lightbox.style.opacity = '1', 10);
    
    // Fechar ao clicar fora da imagem
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeBtn.click();
        }
    });
}

// Adicionar botão de contato direto
function addDirectContactButton(modal, modalId) {
    const modalBody = modal.querySelector('.modal-body');
    if (!modalBody || modalBody.querySelector('.direct-contact-section')) return;
    
    const contactSection = document.createElement('div');
    contactSection.className = 'direct-contact-section';
    contactSection.style.cssText = `
        margin-top: 30px;
        padding: 20px;
        background: linear-gradient(135deg, #25d366, #128c7e);
        border-radius: 12px;
        text-align: center;
    `;
    
    const destinationNames = {
        'modal-cataratas': 'Cataratas do Iguaçu',
        'modal-marco': 'Marco das Três Fronteiras',
        'modal-itaipu': 'Usina de Itaipu',
        'modal-city-tour': 'City Tour Foz do Iguaçu',
        'modal-compras-paraguai': 'Compras no Paraguai',
        'modal-yup-star': 'Yup Star Roda Gigante',
        'modal-vale-dinossauros': 'Vale dos Dinossauros',
        'modal-helicoptero': 'Passeio de Helicóptero',
        'modal-marco-argentino': 'Marco Argentino',
        'modal-macuco-safari': 'Macuco Safari',
        'modal-movie-cars': 'Movie Cars',
        'modal-parque-aves': 'Parque das Aves',
        'modal-katamaran': 'Katamaran Foz'
    };
    
    const destinationName = destinationNames[modalId] || 'este destino';
    
    contactSection.innerHTML = `
        <h4 style="color: white; margin-bottom: 15px; display: flex; align-items: center; justify-content: center; gap: 8px;">
            <i class="fas fa-phone"></i> Agende Agora!
        </h4>
        <p style="color: white; margin-bottom: 20px; opacity: 0.9;">
            Entre em contato para mais informações e agendamento
        </p>
        <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
            <a href="https://wa.me/5545998611000?text=Olá Paula! Gostaria de saber mais sobre ${destinationName}." 
               target="_blank" 
               style="display: flex; align-items: center; gap: 8px; padding: 12px 20px; background: rgba(255,255,255,0.2); color: white; text-decoration: none; border-radius: 25px; font-weight: 600;">
                <i class="fab fa-whatsapp"></i> Paula
            </a>
            <a href="https://wa.me/5545999755650?text=Olá Ademilson! Gostaria de agendar ${destinationName}. Pode me passar mais informações?" 
               target="_blank" 
               style="display: flex; align-items: center; gap: 8px; padding: 12px 20px; background: rgba(255,255,255,0.2); color: white; text-decoration: none; border-radius: 25px; transition: all 0.3s ease; font-weight: 600; backdrop-filter: blur(10px);">
                <i class="fab fa-whatsapp"></i> Ademilson
            </a>
        </div>
    `;
    
    modalBody.appendChild(contactSection);
    
    // Adicionar efeitos hover
    contactSection.querySelectorAll('a').forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.background = 'rgba(255,255,255,0.3)';
            link.style.transform = 'translateY(-2px)';
        });
        link.addEventListener('mouseleave', () => {
            link.style.background = 'rgba(255,255,255,0.2)';
            link.style.transform = 'translateY(0)';
        });
    });
}

// Adicionar informações de preço (simulado)
function addPricingInfo(modal, modalId) {
    const modalInfo = modal.querySelector('.modal-info');
    if (!modalInfo || modalInfo.querySelector('.pricing-info')) return;
    
    // Preços simulados (você pode ajustar conforme necessário)
    const pricingData = {
        'modal-cataratas': { price: 'A partir de R$ 80', duration: '6 horas' },
        'modal-marco': { price: 'A partir de R$ 50', duration: '3 horas' },
        'modal-itaipu': { price: 'A partir de R$ 70', duration: '4 horas' },
        'modal-city-tour': { price: 'A partir de R$ 60', duration: '4 horas' },
        'modal-compras-paraguai': { price: 'A partir de R$ 90', duration: '6 horas' },
        'modal-yup-star': { price: 'A partir de R$ 40', duration: '1 hora' },
        'modal-vale-dinossauros': { price: 'A partir de R$ 55', duration: '3 horas' },
        'modal-helicoptero': { price: 'A partir de R$ 200', duration: '10-30 min' },
        'modal-marco-argentino': { price: 'A partir de R$ 120', duration: '8 horas' },
        'modal-macuco-safari': { price: 'A partir de R$ 85', duration: '3 horas' },
        'modal-movie-cars': { price: 'A partir de R$ 45', duration: '2 horas' },
        'modal-parque-aves': { price: 'A partir de R$ 65', duration: '3 horas' },
        'modal-katamaran': { price: 'A partir de R$ 150', duration: '3 horas' },
        'modal-feirinha-puerto-iguazu': { price: 'A partir de R$ 60', duration: '3 horas' },
        'modal-jantar-puerto-iguazu': { price: 'A partir de R$ 120', duration: '4 horas' },
        'modal-museu-cera': { price: 'A partir de R$ 35', duration: '1-2 horas' },
        'modal-vida-sem-paredes': { price: 'R$ 80 a R$ 150', duration: '2-3 horas' }
    };
    
    const pricing = pricingData[modalId];
    if (!pricing) return;
    
    const pricingItem = document.createElement('div');
    pricingItem.className = 'info-item pricing-info';
    pricingItem.style.cssText = `
        background: linear-gradient(135deg, #00d4ff, #0099cc);
        color: white;
        border: none;
    `;
    
    pricingItem.innerHTML = `
        <i class="fas fa-tag" style="color: white;"></i>
        <h4 style="color: white;">Preço</h4>
        <p style="color: white; font-weight: 600;">${pricing.price}</p>
    `;
    
    modalInfo.appendChild(pricingItem);
}

// Função para rastrear abertura de modais (analytics)
function trackModalOpen(modalId) {
    // Aqui você pode adicionar código para analytics
    // Por exemplo, Google Analytics, Facebook Pixel, etc.
    console.log(`Modal opened: ${modalId}`);
    
    // Exemplo com Google Analytics (se estiver configurado)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'modal_open', {
            'modal_id': modalId,
            'event_category': 'engagement'
        });
    }
}

// ========================================
// SISTEMA DE BUSCA NOS DESTINOS
// ========================================
function initDestinationSearch() {
    // Criar campo de busca
    const destinationsSection = document.querySelector('#destinos');
    if (!destinationsSection) return;
    
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.style.cssText = `
        margin-bottom: 40px;
        text-align: center;
    `;
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Buscar destinos...';
    searchInput.className = 'destination-search';
    searchInput.style.cssText = `
        width: 100%;
        max-width: 400px;
        padding: 15px 20px;
        border: 2px solid #e0e0e0;
        border-radius: 25px;
        font-size: 1rem;
        outline: none;
        transition: all 0.3s ease;
        background: white;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    `;
    
    searchInput.addEventListener('focus', () => {
        searchInput.style.borderColor = '#2c5aa0';
        searchInput.style.boxShadow = '0 4px 20px rgba(44, 90, 160, 0.2)';
    });
    
    searchInput.addEventListener('blur', () => {
        searchInput.style.borderColor = '#e0e0e0';
        searchInput.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    });
    
    searchInput.addEventListener('input', (e) => {
        filterDestinations(e.target.value);
    });
    
    searchContainer.appendChild(searchInput);
    
    const destinationsGrid = destinationsSection.querySelector('.destinations-grid');
    if (destinationsGrid) {
        destinationsSection.insertBefore(searchContainer, destinationsGrid);
    }
}

// Filtrar destinos baseado na busca
function filterDestinations(searchTerm) {
    const cards = document.querySelectorAll('.destination-card');
    const term = searchTerm.toLowerCase();
    
    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(term) || description.includes(term)) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

// ========================================
// SISTEMA DE LOADING MELHORADO
// ========================================
function showLoadingSpinner() {
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    spinner.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10002;
        width: 50px;
        height: 50px;
        border: 3px solid #f3f3f3;
        border-top: 3px solid #2c5aa0;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;
    
    document.body.appendChild(spinner);
    return spinner;
}

function hideLoadingSpinner(spinner) {
    if (spinner && spinner.parentNode) {
        spinner.parentNode.removeChild(spinner);
    }
}

// ========================================
// MELHORIAS NA INICIALIZAÇÃO
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Inicialização de todas as funcionalidades existentes
    initScrollEffects();
    initNavigation();
    initHeroAnimations();
    initDestinationCards();
    initRatingSystem();
    initModals();
    initFloatingElements();
    initSmoothScroll();
    initNotificationSystem();
    initFooterNavigation();
    loadSavedReviews();
    addScrollToTop();
    improveAccessibility();
    
    // Novas funcionalidades
    initDestinationSearch();
    
    // Adicionar animação CSS para fadeInUp
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes spin {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        .modal-opening {
            animation: modalFadeIn 0.3s ease;
        }
        
        @keyframes modalFadeIn {
            from {
                opacity: 0;
                backdrop-filter: blur(0px);
            }
            to {
                opacity: 1;
                backdrop-filter: blur(5px);
            }
        }
    `;
    document.head.appendChild(style);
    initCompactNavigation(); // Adicionar esta linha
});

// ========================================
// SISTEMA COMPLETO DE AVALIAÇÕES
// ========================================

// Função para salvar avaliação no localStorage
function saveReview(reviewData) {
    try {
        // Obter avaliações existentes
        let reviews = JSON.parse(localStorage.getItem('customerReviews') || '[]');
        
        // Adicionar ID único e timestamp
        reviewData.id = Date.now().toString();
        reviewData.timestamp = new Date().toISOString();
        
        // Adicionar nova avaliação no início do array
        reviews.unshift(reviewData);
        
        // Limitar a 50 avaliações para não sobrecarregar o localStorage
        if (reviews.length > 50) {
            reviews = reviews.slice(0, 50);
        }
        
        // Salvar no localStorage
        localStorage.setItem('customerReviews', JSON.stringify(reviews));
        
        console.log('Avaliação salva com sucesso:', reviewData);
        return true;
    } catch (error) {
        console.error('Erro ao salvar avaliação:', error);
        return false;
    }
}

// Função para carregar e exibir avaliações salvas
function loadSavedReviews() {
    try {
        const reviewsList = document.getElementById('reviewsList');
        if (!reviewsList) return;
        
        // Obter avaliações do localStorage
        let reviews = JSON.parse(localStorage.getItem('customerReviews') || '[]');
        
        // Se não há avaliações salvas, adicionar avaliações de exemplo
        if (reviews.length === 0) {
            reviews = getDefaultReviews();
            localStorage.setItem('customerReviews', JSON.stringify(reviews));
        }
        
        // Limpar lista atual
        reviewsList.innerHTML = '';
        
        if (reviews.length === 0) {
            reviewsList.innerHTML = `
                <div class="no-reviews">
                    <i class="fas fa-comments"></i>
                    <p>Ainda não há avaliações. Seja o primeiro a avaliar nossos serviços!</p>
                </div>
            `;
            return;
        }
        
        // Renderizar cada avaliação
        reviews.forEach((review, index) => {
            const reviewElement = createReviewElement(review, index);
            reviewsList.appendChild(reviewElement);
        });
        
        // Adicionar animação de entrada
        setTimeout(() => {
            document.querySelectorAll('.review-item').forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('new');
                }, index * 100);
            });
        }, 100);
        
    } catch (error) {
        console.error('Erro ao carregar avaliações:', error);
        const reviewsList = document.getElementById('reviewsList');
        if (reviewsList) {
            reviewsList.innerHTML = `
                <div class="no-reviews">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Erro ao carregar avaliações. Tente recarregar a página.</p>
                </div>
            `;
        }
    }
}

// Função para criar elemento HTML de uma avaliação
function createReviewElement(review, index) {
    const reviewItem = document.createElement('div');
    reviewItem.className = 'review-item';
    reviewItem.style.animationDelay = `${index * 0.1}s`;
    
    // Gerar estrelas baseado na avaliação
    const starsHtml = generateStarsHtml(parseInt(review.rating));
    
    // Formatar data
    const reviewDate = formatReviewDate(review.date || review.timestamp);
    
    reviewItem.innerHTML = `
        <div class="review-header">
            <div class="review-author">
                <i class="fas fa-user-circle"></i>
                ${escapeHtml(review.name)}
            </div>
            <div class="review-rating">
                ${starsHtml}
            </div>
        </div>
        <div class="review-date">
            <i class="fas fa-calendar-alt"></i>
            ${reviewDate}
        </div>
        <div class="review-comment">
            ${escapeHtml(review.comment)}
        </div>
    `;
    
    return reviewItem;
}

// Função para gerar HTML das estrelas
function generateStarsHtml(rating) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starsHtml += '<i class="fas fa-star"></i>';
        } else {
            starsHtml += '<i class="far fa-star"></i>';
        }
    }
    return starsHtml;
}

// Função para formatar data da avaliação
function formatReviewDate(dateString) {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (error) {
        return dateString || 'Data não disponível';
    }
}

// Função para escapar HTML e prevenir XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Função para obter avaliações padrão/exemplo
function getDefaultReviews() {
    return [
        {
            id: 'default-1',
            name: 'Maria Silva',
            email: 'maria@email.com',
            rating: '5',
            comment: 'Experiência incrível! Paula e Ademilson são guias excepcionais, conhecem cada detalhe das Cataratas. O passeio foi muito bem organizado e eles fizeram questão de que aproveitássemos cada momento. Recomendo de olhos fechados!',
            date: '2024-12-15',
            timestamp: '2024-12-15T10:30:00.000Z'
        },
        {
            id: 'default-2',
            name: 'João Santos',
            email: 'joao@email.com',
            rating: '5',
            comment: 'Profissionais de primeira! Fizemos o tour completo com eles e foi simplesmente perfeito. Conhecimento técnico, simpatia e dedicação em cada explicação. As fotos que tiraram de nós ficaram lindas!',
            date: '2024-12-10',
            timestamp: '2024-12-10T14:20:00.000Z'
        },
        {
            id: 'default-3',
            name: 'Ana Costa',
            email: 'ana@email.com',
            rating: '5',
            comment: 'Que dupla fantástica! Além de guias experientes, são pessoas muito carinhosas. Minha família toda adorou o passeio. Eles têm um conhecimento impressionante sobre a região e fazem você se sentir em casa.',
            date: '2024-12-08',
            timestamp: '2024-12-08T16:45:00.000Z'
        },
        {
            id: 'default-4',
            name: 'Carlos Oliveira',
            email: 'carlos@email.com',
            rating: '4',
            comment: 'Excelente serviço! Pontuais, organizados e muito atenciosos. O passeio às Cataratas foi inesquecível. Única sugestão seria incluir mais tempo no lado argentino, mas no geral foi perfeito!',
            date: '2024-12-05',
            timestamp: '2024-12-05T11:15:00.000Z'
        },
        {
            id: 'default-5',
            name: 'Fernanda Lima',
            email: 'fernanda@email.com',
            rating: '5',
            comment: 'Simplesmente os melhores guias de Foz! Fizemos vários passeios com eles e todos foram excepcionais. Conhecem os melhores ângulos para fotos, os horários ideais para cada atração e sempre com muita alegria e profissionalismo.',
            date: '2024-12-01',
            timestamp: '2024-12-01T09:30:00.000Z'
        },
        {
            id: 'default-6',
            name: 'Roberto Mendes',
            email: 'roberto@email.com',
            rating: '5',
            comment: 'Que experiência maravilhosa! Paula e Ademilson transformaram nossa viagem em algo muito especial. Além do conhecimento técnico, eles têm um carinho genuíno pelos turistas. Voltaremos com certeza!',
            date: '2024-11-28',
            timestamp: '2024-11-28T13:20:00.000Z'
        }
    ];
}

// Função para calcular estatísticas das avaliações
function getReviewsStats() {
    try {
        const reviews = JSON.parse(localStorage.getItem('customerReviews') || '[]');
        
        if (reviews.length === 0) {
            return {
                total: 0,
                average: 0,
                distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
            };
        }
        
        const total = reviews.length;
        const sum = reviews.reduce((acc, review) => acc + parseInt(review.rating), 0);
        const average = (sum / total).toFixed(1);
        
        const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        reviews.forEach(review => {
            const rating = parseInt(review.rating);
            if (rating >= 1 && rating <= 5) {
                distribution[rating]++;
            }
        });
        
        return { total, average, distribution };
    } catch (error) {
        console.error('Erro ao calcular estatísticas:', error);
        return { total: 0, average: 0, distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } };
    }
}

// Função para limpar todas as avaliações (útil para testes)
function clearAllReviews() {
    localStorage.removeItem('customerReviews');
    loadSavedReviews();
    showNotification('Todas as avaliações foram removidas!', 'info');
}

// Função para exportar avaliações para JSON
function exportReviews() {
    try {
        const reviews = JSON.parse(localStorage.getItem('customerReviews') || '[]');
        const dataStr = JSON.stringify(reviews, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'avaliacoes-paula-ademilson.json';
        link.click();
        
        showNotification('Avaliações exportadas com sucesso!', 'success');
    } catch (error) {
        console.error('Erro ao exportar avaliações:', error);
        showNotification('Erro ao exportar avaliações!', 'error');
    }
}

// ========================================
// FUNÇÕES AUXILIARES PARA AVALIAÇÕES
// ========================================

// Função para adicionar avaliação de exemplo (para testes)
function addSampleReview() {
    const sampleReview = {
        name: 'Visitante Teste',
        email: 'teste@email.com',
        rating: '5',
        comment: 'Esta é uma avaliação de teste para demonstrar o funcionamento do sistema.',
        date: new Date().toLocaleDateString('pt-BR')
    };
    
    saveReview(sampleReview);
    loadSavedReviews();
    showNotification('Avaliação de teste adicionada!', 'success');
}

// Função para obter avaliação por ID
function getReviewById(reviewId) {
    try {
        const reviews = JSON.parse(localStorage.getItem('customerReviews') || '[]');
        return reviews.find(review => review.id === reviewId);
    } catch (error) {
        console.error('Erro ao buscar avaliação:', error);
        return null;
    }
}

// Função para remover avaliação por ID
function removeReviewById(reviewId) {
    try {
        let reviews = JSON.parse(localStorage.getItem('customerReviews') || '[]');
        reviews = reviews.filter(review => review.id !== reviewId);
        localStorage.setItem('customerReviews', JSON.stringify(reviews));
        loadSavedReviews();
        showNotification('Avaliação removida!', 'info');
        return true;
    } catch (error) {
        console.error('Erro ao remover avaliação:', error);
        showNotification('Erro ao remover avaliação!', 'error');
        return false;
    }
}

// ========================================
// MELHORIAS FINAIS E INICIALIZAÇÃO
// ========================================

// Adicionar função initCompactNavigation que estava faltando
function initCompactNavigation() {
    // Implementação da navegação compacta
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Adicionar funções que estavam sendo chamadas mas não implementadas
function initFloatingElements() {
    // Implementação de elementos flutuantes
    console.log('Floating elements initialized');
}

function initSmoothScroll() {
    // Implementação de scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initNotificationSystem() {
    // Sistema de notificações já implementado via showNotification
    console.log('Notification system initialized');
}

function initFooterNavigation() {
    // Implementação da navegação do footer
    console.log('Footer navigation initialized');
}

function addScrollToTop() {
    // Botão de voltar ao topo
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #2c5aa0, #1e3a8a);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(44, 90, 160, 0.3);
    `;
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    document.body.appendChild(scrollToTopBtn);
}

function improveAccessibility() {
    // Melhorias de acessibilidade
    document.querySelectorAll('img').forEach(img => {
        if (!img.alt) {
            img.alt = 'Imagem do site Paula e Ademilson Turismo';
        }
    });
    
    // Adicionar skip links
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Pular para o conteúdo principal';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 10000;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

function showNotification(message, type = 'info') {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 10001;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    `;
    
    // Definir cor baseada no tipo
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    
    notification.style.background = colors[type] || colors.info;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Mostrar notificação
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover notificação após 4 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// ========================================
// SISTEMA DE MODAIS LEGAIS
// ========================================

// Função para abrir modais legais
function openLegalModal(type) {
    const modal = document.getElementById('legal-modal');
    const title = document.getElementById('legal-modal-title');
    const body = document.getElementById('legal-modal-body');
    
    if (!modal || !title || !body) return;
    
    // Definir título e conteúdo baseado no tipo
    const legalContent = getLegalContent(type);
    title.textContent = legalContent.title;
    body.innerHTML = legalContent.content;
    
    // Mostrar modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Adicionar animação
    setTimeout(() => {
        modal.classList.add('modal-opening');
    }, 10);
}

// Função para fechar modal legal
function closeLegalModal() {
    const modal = document.getElementById('legal-modal');
    if (!modal) return;
    
    modal.classList.remove('modal-opening');
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Função para obter conteúdo legal
function getLegalContent(type) {
    const contents = {
        privacy: {
            title: 'Política de Privacidade',
            content: `
                <div class="legal-content">
                    <h3>1. Informações Coletadas</h3>
                    <p>Coletamos apenas as informações necessárias para fornecer nossos serviços de turismo:</p>
                    <ul>
                        <li>Nome completo e dados de contato</li>
                        <li>Informações de reserva e preferências de viagem</li>
                        <li>Dados de comunicação via WhatsApp</li>
                    </ul>
                    
                    <h3>2. Uso das Informações</h3>
                    <p>Utilizamos suas informações para:</p>
                    <ul>
                        <li>Organizar e confirmar seus passeios</li>
                        <li>Entrar em contato sobre reservas e atualizações</li>
                        <li>Melhorar nossos serviços de turismo</li>
                        <li>Enviar informações relevantes sobre destinos</li>
                    </ul>
                    
                    <h3>3. Proteção de Dados</h3>
                    <p>Comprometemo-nos a proteger suas informações pessoais e não compartilhamos seus dados com terceiros sem seu consentimento, exceto quando necessário para a prestação dos serviços contratados.</p>
                    
                    <h3>4. Seus Direitos</h3>
                    <p>Você tem o direito de acessar, corrigir ou excluir suas informações pessoais a qualquer momento. Entre em contato conosco para exercer esses direitos.</p>
                    
                    <h3>5. Contato</h3>
                    <p>Para questões sobre privacidade, entre em contato:</p>
                    <p><strong>WhatsApp:</strong> (45) 99861-1000 (Paula) ou (45) 99975-5650 (Ademilson)</p>
                    <p><strong>Email:</strong> deventsystem@outlook.com</p>
                </div>
            `
        },
        terms: {
            title: 'Termos de Uso',
            content: `
                <div class="legal-content">
                    <h3>1. Aceitação dos Termos</h3>
                    <p>Ao utilizar nossos serviços de turismo, você concorda com estes termos de uso.</p>
                    
                    <h3>2. Serviços Oferecidos</h3>
                    <p>Oferecemos serviços de guia turístico em Foz do Iguaçu e região, incluindo:</p>
                    <ul>
                        <li>Passeios às Cataratas do Iguaçu</li>
                        <li>Visitas à Usina de Itaipu</li>
                        <li>City Tour pela cidade</li>
                        <li>Passeios ao Paraguai e Argentina</li>
                        <li>Outros destinos turísticos da região</li>
                    </ul>
                    
                    <h3>3. Responsabilidades</h3>
                    <p><strong>Nossa responsabilidade:</strong></p>
                    <ul>
                        <li>Fornecer guias qualificados e experientes</li>
                        <li>Organizar roteiros seguros e interessantes</li>
                        <li>Manter comunicação clara sobre horários e locais</li>
                    </ul>
                    
                    <p><strong>Sua responsabilidade:</strong></p>
                    <ul>
                        <li>Portar documentos necessários para os passeios</li>
                        <li>Seguir as orientações de segurança</li>
                        <li>Respeitar horários combinados</li>
                        <li>Informar sobre necessidades especiais</li>
                    </ul>
                    
                    <h3>4. Pagamentos e Cancelamentos</h3>
                    <p>Os valores dos passeios são informados no momento da contratação. Políticas de cancelamento serão comunicadas durante a reserva.</p>
                    
                    <h3>5. Limitação de Responsabilidade</h3>
                    <p>Não nos responsabilizamos por fatores externos como condições climáticas, fechamento de atrações por motivos de força maior, ou problemas de saúde dos participantes.</p>
                </div>
            `
        },
        cookies: {
            title: 'Política de Cookies',
            content: `
                <div class="legal-content">
                    <h3>1. O que são Cookies</h3>
                    <p>Cookies são pequenos arquivos de texto armazenados em seu dispositivo quando você visita nosso site.</p>
                    
                    <h3>2. Como Utilizamos Cookies</h3>
                    <p>Utilizamos cookies para:</p>
                    <ul>
                        <li>Melhorar a experiência de navegação</li>
                        <li>Lembrar suas preferências</li>
                        <li>Analisar o tráfego do site</li>
                        <li>Personalizar conteúdo</li>
                    </ul>
                    
                    <h3>3. Tipos de Cookies</h3>
                    <p><strong>Cookies Essenciais:</strong> Necessários para o funcionamento básico do site.</p>
                    <p><strong>Cookies de Análise:</strong> Nos ajudam a entender como os visitantes usam o site.</p>
                    <p><strong>Cookies de Funcionalidade:</strong> Permitem recursos aprimorados e personalização.</p>
                    
                    <h3>4. Gerenciamento de Cookies</h3>
                    <p>Você pode controlar e/ou excluir cookies conforme desejar. Você pode excluir todos os cookies que já estão em seu computador e pode configurar a maioria dos navegadores para impedir que sejam colocados.</p>
                    
                    <h3>5. Cookies de Terceiros</h3>
                    <p>Nosso site pode conter links para sites de terceiros. Não somos responsáveis pelas políticas de cookies desses sites.</p>
                </div>
            `
        },
        cancellation: {
            title: 'Política de Cancelamento',
            content: `
                <div class="legal-content">
                    <h3>1. Cancelamento pelo Cliente</h3>
                    <p><strong>Com 24 horas de antecedência:</strong> Cancelamento gratuito sem cobrança de taxas.</p>
                    <p><strong>Entre 12-24 horas:</strong> Taxa de 50% do valor do passeio.</p>
                    <p><strong>Menos de 12 horas:</strong> Taxa de 100% do valor do passeio.</p>
                    
                    <h3>2. Cancelamento por Nossa Parte</h3>
                    <p>Podemos cancelar passeios devido a:</p>
                    <ul>
                        <li>Condições climáticas adversas</li>
                        <li>Problemas de segurança</li>
                        <li>Fechamento de atrações</li>
                        <li>Número insuficiente de participantes</li>
                    </ul>
                    <p>Nesses casos, oferecemos reagendamento sem custo adicional ou reembolso integral.</p>
                    
                    <h3>3. Reagendamento</h3>
                    <p>Reagendamentos podem ser feitos sem custo adicional com pelo menos 24 horas de antecedência, sujeito à disponibilidade.</p>
                    
                    <h3>4. Reembolsos</h3>
                    <p>Reembolsos serão processados de acordo com a forma de pagamento original em até 7 dias úteis após a solicitação.</p>
                    
                    <h3>5. Casos Especiais</h3>
                    <p>Em casos de emergência médica ou situações excepcionais, analisaremos cada caso individualmente para encontrar a melhor solução.</p>
                    
                    <h3>6. Contato para Cancelamentos</h3>
                    <p>Para cancelar ou reagendar:</p>
                    <p><strong>WhatsApp:</strong> (45) 99861-1000 (Paula) ou (45) 99975-5650 (Ademilson)</p>
                    <p><strong>Email:</strong> deventsystem@outlook.com</p>
                </div>
            `
        }
    };
    
    return contents[type] || {
        title: 'Informação Legal',
        content: '<p>Conteúdo não encontrado.</p>'
    };
}

// ========================================
// CONSOLE HELPERS PARA DESENVOLVIMENTO
// ========================================

// Adicionar funções úteis ao console para desenvolvimento
window.reviewsDebug = {
    getStats: getReviewsStats,
    clearAll: clearAllReviews,
    export: exportReviews,
    addSample: addSampleReview,
    getById: getReviewById,
    removeById: removeReviewById
};

// ===== MELHORIAS VISUAIS E DE ORGANIZAÇÃO =====

// Indicador de Progresso de Scroll
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Sistema de Breadcrumbs
function initBreadcrumbs() {
    const breadcrumbs = document.createElement('div');
    breadcrumbs.className = 'breadcrumbs';
    breadcrumbs.innerHTML = `
        <div class="breadcrumb-item active">
            <i class="fas fa-home"></i>
            <span>Início</span>
        </div>
    `;
    document.body.appendChild(breadcrumbs);
    
    const sections = ['home', 'destinos', 'guias', 'avaliacoes'];
    const sectionNames = {
        'home': 'Início',
        'destinos': 'Destinos',
        'guias': 'Sobre',
        'avaliacoes': 'Avaliações'
    };
    
    const sectionIcons = {
        'home': 'fas fa-home',
        'destinos': 'fas fa-map-marked-alt',
        'guias': 'fas fa-users',
        'avaliacoes': 'fas fa-star'
    };
    
    window.addEventListener('scroll', () => {
        let currentSection = 'home';
        
        sections.forEach(section => {
            const element = document.getElementById(section);
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top <= 100 && rect.bottom >= 100) {
                    currentSection = section;
                }
            }
        });
        
        // Atualizar breadcrumb
        breadcrumbs.innerHTML = `
            <div class="breadcrumb-item ${currentSection === 'home' ? 'active' : ''}">
                <i class="${sectionIcons[currentSection]}"></i>
                <span>${sectionNames[currentSection]}</span>
            </div>
        `;
        
        // Mostrar/esconder breadcrumbs
        if (window.pageYOffset > 200) {
            breadcrumbs.classList.add('show');
        } else {
            breadcrumbs.classList.remove('show');
        }
    });
}

// Indicadores de Seção
function initSectionIndicators() {
    const indicator = document.createElement('div');
    indicator.className = 'section-indicator';
    
    const sections = ['home', 'destinos', 'guias', 'avaliacoes'];
    sections.forEach((section, index) => {
        const dot = document.createElement('div');
        dot.className = 'indicator-dot';
        if (index === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => {
            document.getElementById(section)?.scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
        
        indicator.appendChild(dot);
    });
    
    document.body.appendChild(indicator);
    
    // Atualizar indicadores no scroll
    window.addEventListener('scroll', () => {
        let currentIndex = 0;
        
        sections.forEach((section, index) => {
            const element = document.getElementById(section);
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top <= 100) {
                    currentIndex = index;
                }
            }
        });
        
        // Atualizar dots ativos
        indicator.querySelectorAll('.indicator-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    });
}

// Loading Overlay
function showLoading() {
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay show';
    overlay.innerHTML = `
        <div class="loading-spinner"></div>
    `;
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        overlay.classList.remove('show');
        setTimeout(() => overlay.remove(), 300);
    }, 1000);
}

// Efeito Parallax Suave
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Micro-animações nos Cards
function initMicroAnimations() {
    const cards = document.querySelectorAll('.destination-card, .guide-card, .review-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('micro-bounce');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('micro-bounce');
        });
        
        card.addEventListener('click', () => {
            card.classList.add('micro-slide');
            setTimeout(() => card.classList.remove('micro-slide'), 300);
        });
    });
}

// Animações Staggered para elementos
function initStaggeredAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const children = entry.target.children;
                Array.from(children).forEach((child, index) => {
                    child.classList.add(`stagger-${Math.min(index + 1, 6)}`);
                });
            }
        });
    }, observerOptions);
    
    // Observar seções com múltiplos elementos
    document.querySelectorAll('.destinations-grid, .guides-profiles, .reviews-grid').forEach(section => {
        observer.observe(section);
    });
}

// Melhorias nos Modais
function enhanceModals() {
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        const content = modal.querySelector('.modal-content');
        if (content) {
            content.style.animation = 'modalSlideIn 0.4s ease-out';
        }
        
        // Adicionar efeito de blur no fundo
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                content.style.animation = 'modalSlideOut 0.3s ease-in';
                setTimeout(() => {
                    modal.style.display = 'none';
                    content.style.animation = '';
                }, 300);
            }
        });
    });
}

// Carrossel Automático para Reviews
function initReviewCarousel() {
    const reviewsContainer = document.querySelector('.reviews-grid');
    if (!reviewsContainer) return;
    
    const reviews = reviewsContainer.querySelectorAll('.review-card');
    let currentIndex = 0;
    
    // Adicionar indicadores
    const indicators = document.createElement('div');
    indicators.className = 'carousel-indicators';
    indicators.style.cssText = `
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-top: 30px;
    `;
    
    reviews.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.style.cssText = `
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            cursor: pointer;
            transition: all 0.3s ease;
        `;
        if (index === 0) dot.style.background = '#00d4ff';
        
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
        
        indicators.appendChild(dot);
    });
    
    reviewsContainer.parentNode.appendChild(indicators);
    
    function updateCarousel() {
        reviews.forEach((review, index) => {
            review.style.opacity = index === currentIndex ? '1' : '0.5';
            review.style.transform = index === currentIndex ? 'scale(1)' : 'scale(0.9)';
        });
        
        indicators.querySelectorAll('div').forEach((dot, index) => {
            dot.style.background = index === currentIndex ? '#00d4ff' : 'rgba(255, 255, 255, 0.3)';
        });
    }
    
    // Auto-play
    setInterval(() => {
        currentIndex = (currentIndex + 1) % reviews.length;
        updateCarousel();
    }, 5000);
}

// Inicializar todas as melhorias
function initEnhancements() {
    initScrollProgress();
    initBreadcrumbs();
    initSectionIndicators();
    initParallaxEffect();
    initMicroAnimations();
    initStaggeredAnimations();
    enhanceModals();
    initReviewCarousel();
    
    // Adicionar classes parallax aos elementos apropriados
    document.querySelectorAll('.hero-particles, .footer-wave').forEach(el => {
        el.classList.add('parallax-element');
    });
    
    console.log('✨ Melhorias visuais inicializadas com sucesso!');
}

console.log('🌟 Sistema de Avaliações Paula & Ademilson carregado com sucesso!');
console.log('💡 Use window.reviewsDebug para acessar funções de desenvolvimento');
