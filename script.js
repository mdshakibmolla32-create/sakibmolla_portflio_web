const siteHeader=document.getElementById("site-header");const mobileMenuButton=document.getElementById("mobile-menu-button");const navMenu=document.getElementById("primary-navigation");const navLinks=document.querySelectorAll(".nav-link");const contactForm=document.getElementById("contact-form");const formSuccess=document.getElementById("form-success");const heroImage=document.getElementById("hero-profile-image");const aboutImage=document.getElementById("about-profile-image");

const imageBaseName="Md Sakib Molla";const supportedImageExtensions=["jpg","jpeg","png","webp"];

function imageExists(path){return new Promise(resolve=>{const image=new Image();image.onload=()=>resolve(true);image.onerror=()=>resolve(false);image.src=path})}

async function findProfileImage(){for(const extension of supportedImageExtensions){const imagePath=`${imageBaseName}.${extension}`;if(await imageExists(imagePath))return imagePath}return null}

async function loadProfileImages(){const imagePath=await findProfileImage();if(!imagePath){console.warn("Profile image not found. Add Md Sakib Molla.jpg, .jpeg, .png, or .webp to the root folder.");return}if(heroImage)heroImage.src=imagePath;if(aboutImage)aboutImage.src=imagePath}

function openMobileMenu(){navMenu.classList.add("open");mobileMenuButton.classList.add("active");mobileMenuButton.setAttribute("aria-expanded","true");mobileMenuButton.setAttribute("aria-label","Close navigation menu");document.body.classList.add("menu-open")}
function closeMobileMenu(){navMenu.classList.remove("open");mobileMenuButton.classList.remove("active");mobileMenuButton.setAttribute("aria-expanded","false");mobileMenuButton.setAttribute("aria-label","Open navigation menu");document.body.classList.remove("menu-open")}
function toggleMobileMenu(){navMenu.classList.contains("open")?closeMobileMenu():openMobileMenu()}
if(mobileMenuButton)mobileMenuButton.addEventListener("click",toggleMobileMenu);
navLinks.forEach(link=>link.addEventListener("click",closeMobileMenu));
document.addEventListener("click",event=>{if(!navMenu.contains(event.target)&&!mobileMenuButton.contains(event.target))closeMobileMenu()});

function updateHeader(){siteHeader.classList.toggle("scrolled",window.scrollY>20)}
window.addEventListener("scroll",updateHeader,{passive:true});updateHeader();

const sections=document.querySelectorAll("main section[id]");
const sectionObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){const currentSectionId=entry.target.id;navLinks.forEach(link=>link.classList.toggle("active",link.getAttribute("href")===`#${currentSectionId}`))}})},{threshold:.2,rootMargin:"-20% 0px -55% 0px"});
sections.forEach(section=>sectionObserver.observe(section));

const revealElements=document.querySelectorAll(".reveal");
const revealObserver=new IntersectionObserver((entries,observer)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target)}})},{threshold:.12,rootMargin:"0px 0px -40px 0px"});
revealElements.forEach(element=>revealObserver.observe(element));

if(contactForm){contactForm.addEventListener("submit",event=>{event.preventDefault();if(!contactForm.checkValidity()){contactForm.reportValidity();return}formSuccess.classList.add("visible");contactForm.reset();window.setTimeout(()=>formSuccess.classList.remove("visible"),7000)})}

document.addEventListener("keydown",event=>{if(event.key==="Escape")closeMobileMenu()});
loadProfileImages();