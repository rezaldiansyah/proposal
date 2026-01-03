/**
 * Habits Media Presentation Platform
 * Presentation JavaScript - Reveal.js + ECharts Integration
 */

import Reveal from 'reveal.js';
import * as echarts from 'echarts';
import { gsap } from 'gsap';

// ================================================
// REVEAL.JS INITIALIZATION
// ================================================
const deck = new Reveal({
    hash: true,
    slideNumber: 'c/t',
    progress: true,
    center: true,
    transition: 'slide',
    transitionSpeed: 'default',
    backgroundTransition: 'fade',
    viewDistance: 3,
    width: 1280,
    height: 720,
    margin: 0.1,
    minScale: 0.2,
    maxScale: 2.0,
});

deck.initialize().then(() => {
    console.log('Reveal.js initialized');

    // Initialize charts when their slides become visible
    deck.on('slidechanged', (event) => {
        if (event.currentSlide.querySelector('#timeline-chart')) {
            initTimelineChart();
        }
        if (event.currentSlide.querySelector('#roadmap-chart')) {
            initRoadmapChart();
        }
    });

    // Initialize charts on first slide if visible
    setTimeout(() => {
        initTimelineChart();
        initRoadmapChart();
    }, 500);
});

// ================================================
// ECHARTS: TIMELINE CHART
// ================================================
function initTimelineChart() {
    const chartDom = document.getElementById('timeline-chart');
    if (!chartDom || chartDom.dataset.initialized) return;

    chartDom.dataset.initialized = 'true';
    const chart = echarts.init(chartDom, 'dark');

    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['Week 1-2', 'Week 3-4', 'Week 5-6', 'Week 7-8', 'Week 9-10', 'Week 11-12'],
            axisLine: { lineStyle: { color: '#555' } },
            axisLabel: { color: '#999' }
        },
        yAxis: {
            type: 'value',
            name: 'Progress %',
            max: 100,
            axisLine: { lineStyle: { color: '#555' } },
            axisLabel: { color: '#999' },
            splitLine: { lineStyle: { color: '#333' } }
        },
        series: [
            {
                name: 'Planning & Audit',
                type: 'bar',
                stack: 'total',
                data: [80, 100, 20, 0, 0, 0],
                itemStyle: { color: '#3b82f6' },
                emphasis: { focus: 'series' }
            },
            {
                name: 'SOP Implementation',
                type: 'bar',
                stack: 'total',
                data: [0, 0, 60, 100, 50, 20],
                itemStyle: { color: '#38bdf8' },
                emphasis: { focus: 'series' }
            },
            {
                name: 'Pilot Projects',
                type: 'bar',
                stack: 'total',
                data: [0, 0, 0, 0, 50, 80],
                itemStyle: { color: '#10b981' },
                emphasis: { focus: 'series' }
            }
        ],
        legend: {
            data: ['Planning & Audit', 'SOP Implementation', 'Pilot Projects'],
            textStyle: { color: '#999' },
            top: '2%'
        },
        animationDuration: 1500,
        animationEasing: 'elasticOut'
    };

    chart.setOption(option);

    // Handle resize
    window.addEventListener('resize', () => chart.resize());
}

// ================================================
// ECHARTS: ROADMAP CHART
// ================================================
function initRoadmapChart() {
    const chartDom = document.getElementById('roadmap-chart');
    if (!chartDom || chartDom.dataset.initialized) return;

    chartDom.dataset.initialized = 'true';
    const chart = echarts.init(chartDom, 'dark');

    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c}%'
        },
        radar: {
            indicator: [
                { name: 'SOP Coverage', max: 100 },
                { name: 'Process Automation', max: 100 },
                { name: 'Team Autonomy', max: 100 },
                { name: 'System Integration', max: 100 },
                { name: 'Data-Driven Decisions', max: 100 },
                { name: 'Risk Management', max: 100 }
            ],
            center: ['50%', '50%'],
            radius: '65%',
            axisName: {
                color: '#a0a0a0',
                fontSize: 12
            },
            splitArea: {
                areaStyle: {
                    color: ['rgba(56, 189, 248, 0.05)', 'rgba(56, 189, 248, 0.1)'],
                    shadowColor: 'rgba(0, 0, 0, 0.2)',
                    shadowBlur: 10
                }
            },
            axisLine: {
                lineStyle: { color: 'rgba(255, 255, 255, 0.1)' }
            },
            splitLine: {
                lineStyle: { color: 'rgba(255, 255, 255, 0.1)' }
            }
        },
        legend: {
            data: ['Current State', 'Q2 2026', 'Q4 2026'],
            textStyle: { color: '#999' },
            bottom: '5%'
        },
        series: [
            {
                name: 'Roadmap Progress',
                type: 'radar',
                data: [
                    {
                        value: [20, 10, 15, 25, 30, 20],
                        name: 'Current State',
                        areaStyle: { opacity: 0.2, color: '#ef4444' },
                        lineStyle: { color: '#ef4444', width: 2 },
                        itemStyle: { color: '#ef4444' }
                    },
                    {
                        value: [60, 45, 40, 55, 60, 50],
                        name: 'Q2 2026',
                        areaStyle: { opacity: 0.2, color: '#f97316' },
                        lineStyle: { color: '#f97316', width: 2 },
                        itemStyle: { color: '#f97316' }
                    },
                    {
                        value: [100, 80, 70, 90, 95, 85],
                        name: 'Q4 2026',
                        areaStyle: { opacity: 0.3, color: '#38bdf8' },
                        lineStyle: { color: '#38bdf8', width: 3 },
                        itemStyle: { color: '#38bdf8' }
                    }
                ]
            }
        ],
        animationDuration: 2000,
        animationEasing: 'elasticOut'
    };

    chart.setOption(option);

    // Handle resize
    window.addEventListener('resize', () => chart.resize());
}

// ================================================
// GSAP ANIMATIONS
// ================================================
document.addEventListener('DOMContentLoaded', () => {
    // Animate logo on cover slide
    gsap.from('.slide-cover .logo span', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
    });

    gsap.from('.slide-cover .tagline', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: 0.5,
        ease: 'power3.out'
    });

    gsap.from('.slide-cover .title', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: 0.7,
        ease: 'power3.out'
    });

    gsap.from('.slide-cover .date', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: 0.9,
        ease: 'power3.out'
    });
});

// Console branding
console.log(
    '%c Habits Media Network. ',
    'background: #0a0a0a; color: #38bdf8; font-size: 20px; font-weight: bold; padding: 10px 20px;'
);
console.log('%c Annual Meeting 2026 Presentation', 'color: #38bdf8; font-size: 12px;');
console.log('%c Navigate with arrow keys or swipe', 'color: #666; font-size: 11px;');

// Make Reveal globally accessible for agenda navigation (BEFORE DOMContentLoaded)
window.Reveal = deck;

// ================================================
// FLOATING AGENDA MENU
// ================================================
deck.on('ready', () => {
    const agendaToggle = document.getElementById('agenda-toggle');
    const agendaNav = document.getElementById('agenda-nav');
    const agendaClose = document.getElementById('agenda-close');
    const agendaLinks = document.querySelectorAll('.agenda-list a, .agenda-item');

    console.log('%c 📋 Agenda Menu Initialized', 'color: #10b981; font-size: 11px;');
    console.log('Found', agendaLinks.length, 'navigation links');

    if (agendaToggle && agendaNav) {
        // Toggle menu
        agendaToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            agendaNav.classList.toggle('active');
        });

        // Close button
        if (agendaClose) {
            agendaClose.addEventListener('click', () => {
                agendaNav.classList.remove('active');
            });
        }

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!agendaNav.contains(e.target) && !agendaToggle.contains(e.target)) {
                agendaNav.classList.remove('active');
            }
        });

        // Navigate on link click - use deck directly
        agendaLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                const href = link.getAttribute('href');
                const slideIndex = parseInt(href.replace('#/', ''));

                console.log('Navigating to slide:', slideIndex);

                if (!isNaN(slideIndex)) {
                    deck.slide(slideIndex, 0, 0);
                }

                agendaNav.classList.remove('active');
            });
        });

        // Update active state on slide change
        deck.on('slidechanged', (event) => {
            agendaLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href) {
                    const slideIndex = parseInt(href.replace('#/', ''));
                    if (slideIndex === event.indexh) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                }
            });
        });

        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                agendaNav.classList.remove('active');
            }
        });
    }
});

// ================================================
// 4 PILLARS VISUALIZATION INTERACTIVITY
// ================================================
document.addEventListener('DOMContentLoaded', () => {
    const airplaneScene = document.getElementById('airplane-viz');
    const flightStatus = document.getElementById('flight-status');

    if (!airplaneScene || !flightStatus) return;

    const engineCards = document.querySelectorAll('.engine-card');
    let activeEngines = new Set();

    // Update status message
    function updateStatus() {
        const count = activeEngines.size;
        const statusIcon = flightStatus.querySelector('.status-icon');
        const statusText = flightStatus.querySelector('.status-text');

        flightStatus.classList.remove('success', 'warning');

        if (count === 0) {
            statusIcon.textContent = '💡';
            statusText.textContent = 'Click each card to power up the engine!';
        } else if (count === 4) {
            flightStatus.classList.add('success');
            statusIcon.textContent = '🚀';
            statusText.textContent = 'All 4 engines running! Ready for takeoff! ✈️';
            airplaneScene.classList.add('flying');
        } else {
            flightStatus.classList.add('warning');
            statusIcon.textContent = '⚠️';
            statusText.textContent = `Only ${count}/4 engines active. Need all 4 for balanced flight!`;
            airplaneScene.classList.remove('flying');
        }
    }

    // Engine card click handler
    engineCards.forEach(card => {
        const engineType = card.dataset.engine;

        card.addEventListener('click', () => {
            if (card.classList.contains('active')) {
                // Deactivate
                card.classList.remove('active');
                activeEngines.delete(engineType);
            } else {
                // Activate
                card.classList.add('active');
                activeEngines.add(engineType);
            }
            updateStatus();
        });
    });

    console.log('%c ✈️ 4 Pillars Visualization Ready', 'color: #38bdf8; font-size: 12px;');
});
